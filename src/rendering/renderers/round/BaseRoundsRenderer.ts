import { Logger } from '@infra'

import { RenderingContext, BaseRenderer } from '@rendering'
import { SILVER_LEVEL_TEXTURE, GOLD_LEVEL_TEXTURE, BRONZE_LEVEL_TEXTURE } from '@rendering/textures/symbols'

import { Container } from '@lib/pixi'
import { isEmpty, forEach, nowUnixTS, binarySearchNearest } from '@lib/utils'
import { eq, gt, lt } from '@lib/calc-utils'
import { PricePoint, DataBuilder } from '@chartdata'
import { EPosition } from '@enums'

import { PRIZEFUNDS } from '@constants'
import { SILVER, GOLD, BRONZE } from '@constants'

export abstract class BaseRoundsRenderer extends BaseRenderer {

    protected prevrounds: { [key:string]: string } = {}

    protected newrounds: { [key:string]: string } = {}

    protected update(
        context: RenderingContext,
        layer: Container,
    ): Container {
        if (isEmpty(context.rounds)) {
            this.cleanup()

            return layer
        }

        this.updateEachRound(context, layer)
        this.cleanup()

        return layer
    }

    private updateEachRound(
        context: RenderingContext,
        layer: Container,
    ): void {

        forEach(context.rounds, (round, idx) => {
            // NOTE: short exit if not in timeframe, [performance improvment]
            if (round.endDate < context.timeframe.since) return
            if (round.startDate > context.timeframe.until) return

            this.rebind(round.roundid)
            this.updateRound(round, context, layer, idx)
            this.newrounds[round.roundid] = round.roundid
        })

    }

    private cleanup(): void {

        forEach(this.prevrounds, roundid => {
            if (roundid in this.newrounds) return

            this.rebind(roundid)
            this.clear()
        })

        this.prevrounds = this.newrounds
        this.newrounds = {}
    }

    protected getRoundResolution(
        round: any,
        context: RenderingContext,
    ): EPosition {

        if (round.resolved) return round.resolution
        if (this.isNoContestRound(round, context)) return EPosition.NoContest

        const rprice = this.getResolutionPricePoint(round, context)
        const resolution = this.getRoundResolutionByPrice(round, rprice)

        return resolution
    }

    private getRoundResolutionByPrice(
        round: any,
        exitPrice: PricePoint | null,
    ): EPosition {

        if (!exitPrice || !round.entryPriceValue) return EPosition.Undefined
        if (eq(exitPrice.value, round.entryPriceValue)) return EPosition.Zero
        if (gt(exitPrice.value, round.entryPriceValue)) return EPosition.Up
        if (lt(exitPrice.value, round.entryPriceValue)) return EPosition.Down

        return EPosition.Undefined
    }

    private isNoContestRound(
        round: any,
        context: RenderingContext,
    ): boolean {

        if (this.isActualRound(round, context)) {
            if ((nowUnixTS() - (context.options.noContestDelay || 0)) < round.lockDate) return false

            const price = DataBuilder.getLatest(context.chartdata)
            if (!price?.timestamp || price.timestamp < round.lockDate) return false
        }

        if (this.isNoContestEmptyRound(round)) return true

        if (round.resolved && round.resolution === EPosition.NoContest) return true
        if (!this.isHistoricalRound(round, context)) return false

        const rprice = this.getResolutionPricePoint(round, context)
        const resolution = this.getRoundResolutionByPrice(round, rprice)
        if (this._isNoContestRound(round, resolution)) return true

        return false
    }

    protected isNoContestEmptyRound(round: any): boolean {
        const prizefundTotal = round.prizefunds[PRIZEFUNDS.TOTAL]

        return (
            round.prizefunds[PRIZEFUNDS.UP] == prizefundTotal ||
            round.prizefunds[PRIZEFUNDS.ZERO] == prizefundTotal ||
            round.prizefunds[PRIZEFUNDS.DOWN] == prizefundTotal
        )
    }

    private _isNoContestRound(round: any, position: EPosition): boolean {
        if (position === EPosition.Undefined) return false

        const prizefundTotal = round.prizefunds[PRIZEFUNDS.TOTAL]
        const prizefundWin = round.prizefunds[position]

        return Number(prizefundWin) === 0 || prizefundWin === prizefundTotal
    }

    protected isHistoricalRound(
        round: any,
        context: RenderingContext,
    ): boolean {

        if (this.isActualRound(round, context)) return false

        return (
            round.resolved ||
            !!context.settlments?.[round.endDate]
        )
    }

    protected getResolutionPricePoint(
        round: any,
        context: RenderingContext,
    ): PricePoint | null {

        const isResolveReady = !round.resolved && context.settlments?.[round.endDate]
        if (isResolveReady) {
            return {
                value: context.settlments[round.endDate].exitPrice.value,
                timestamp: context.settlments[round.endDate].exitPrice.timestamp,
            }
        }

        const isResolved = round.resolved && round.exitPriceTimestamp && round.exitPriceValue
        if (isResolved) {
            return {
                value: round.exitPriceValue,
                timestamp: round.exitPriceTimestamp,
            }
        }

        const isResolvedNoResolutionPrice = round.resolved && (!round.exitPriceTimestamp || !round.exitPriceValue)
        if (isResolvedNoResolutionPrice && context.settlments?.[round.endDate]) {
            return {
                value: context.settlments[round.endDate].exitPrice.value,
                timestamp: context.settlments[round.endDate].exitPrice.timestamp,
            }
        }

        const latest = DataBuilder.getLatest(context.chartdata)

        if (latest.timestamp <= round.entryPriceTimestamp) return null
        if (latest.timestamp < round.endDate) {
            const nextpp = context.morph.next
            if (nextpp && nextpp.timestamp > round.endDate) {
                return DataBuilder.getSecondLatest(context.chartdata)
            }

            return latest
        }

        return this.getRoundResolutionPriceFormPricefeed(round.endDate, context.chartdata)

    }

    protected getRoundResolutionPriceFormPricefeed(
        endDate,
        chartdata: { timestamps, prices }
    ): PricePoint | null {
        const { timestamps, prices } = chartdata

        const index = binarySearchNearest(timestamps, endDate-1)

        if (index === -1) return null

        return {
            timestamp: timestamps[index],
            value: prices[index],
        }

    }

    protected isActualRound(
        round: any,
        context: RenderingContext,
    ): boolean {
        const now = context?.plotdata?.latest?.timestamp || nowUnixTS()
        const end = round?.endDate

        return end > now
    }

    protected getLevelTextureName(context: RenderingContext): symbol {

        switch (context.game?.level) {
            case BRONZE:
                return BRONZE_LEVEL_TEXTURE
            case SILVER:
                return SILVER_LEVEL_TEXTURE
            case GOLD:
                return GOLD_LEVEL_TEXTURE

            default:
                Logger.error(`game level "${context.game?.level}" is not supported, fallback to SILVER`)

                return SILVER_LEVEL_TEXTURE
        }

    }

    protected abstract updateRound(round: any, context: RenderingContext, container: Container, index: number): void

}
