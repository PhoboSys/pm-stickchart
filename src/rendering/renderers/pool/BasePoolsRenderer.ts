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

export abstract class BasePoolsRenderer extends BaseRenderer {

    protected prevpools: { [key:string]: string } = {}

    protected newpools: { [key:string]: string } = {}

    protected update(
        context: RenderingContext,
        layer: Container,
    ): Container {
        if (isEmpty(context.pools)) {
            this.cleanup()

            return layer
        }

        this.updateEachPool(context, layer)
        this.cleanup()

        return layer
    }

    private updateEachPool(
        context: RenderingContext,
        layer: Container,
    ): void {

        forEach(context.pools, (pool, idx) => {
            // NOTE: short exit if not in timeframe, [performance improvment]
            if (pool.endDate < context.timeframe.since) return
            if (pool.startDate > context.timeframe.until) return

            this.rebind(pool.poolid)
            this.updatePool(pool, context, layer, idx)
            this.newpools[pool.poolid] = pool.poolid
        })

    }

    private cleanup(): void {

        forEach(this.prevpools, poolid => {
            if (poolid in this.newpools) return

            this.rebind(poolid)
            this.clear()
        })

        this.prevpools = this.newpools
        this.newpools = {}
    }

    protected getPoolResolution(
        pool: any,
        context: RenderingContext,
    ): EPosition {

        if (pool.resolved) return pool.resolution
        if (this.isNoContestPool(pool, context)) return EPosition.NoContest

        const rprice = this.getResolutionPricePoint(pool, context)
        const resolution = this.getPoolResolutionByPrice(pool, rprice)

        return resolution
    }

    private getPoolResolutionByPrice(
        pool: any,
        resolutionPrice: PricePoint | null,
    ): EPosition {

        if (!resolutionPrice || !pool.openPriceValue) return EPosition.Undefined
        if (eq(resolutionPrice.value, pool.openPriceValue)) return EPosition.Zero
        if (gt(resolutionPrice.value, pool.openPriceValue)) return EPosition.Up
        if (lt(resolutionPrice.value, pool.openPriceValue)) return EPosition.Down

        return EPosition.Undefined
    }

    private isNoContestPool(
        pool: any,
        context: RenderingContext,
    ): boolean {

        if (this.isActualPool(pool, context)) {
            if (nowUnixTS() < pool.lockDate) return false

            const price = DataBuilder.getLatest(context.chartdata)
            if (!price?.timestamp || price.timestamp < pool.lockDate) return false
        }

        if (this.isNoContestEmptyPool(pool)) return true

        if (pool.resolved && pool.resolution === EPosition.NoContest) return true
        if (!this.isHistoricalPool(pool, context)) return false

        const rprice = this.getResolutionPricePoint(pool, context)
        const resolution = this.getPoolResolutionByPrice(pool, rprice)
        if (this._isNoContestPool(pool, resolution)) return true

        return false
    }

    protected isNoContestEmptyPool(pool: any): boolean {
        const prizefundTotal = pool.prizefunds[PRIZEFUNDS.TOTAL]

        return (
            pool.prizefunds[PRIZEFUNDS.UP] == prizefundTotal ||
            pool.prizefunds[PRIZEFUNDS.ZERO] == prizefundTotal ||
            pool.prizefunds[PRIZEFUNDS.DOWN] == prizefundTotal
        )
    }

    private _isNoContestPool(pool: any, position: EPosition): boolean {
        if (position === EPosition.Undefined) return false

        const prizefundTotal = pool.prizefunds[PRIZEFUNDS.TOTAL]
        const prizefundWin = pool.prizefunds[position]

        return Number(prizefundWin) === 0 || prizefundWin === prizefundTotal
    }

    protected isHistoricalPool(
        pool: any,
        context: RenderingContext,
    ): boolean {

        if (this.isActualPool(pool, context)) return false

        return (
            pool.resolved ||
            !!context.settlements?.[pool.endDate]
        )
    }

    protected getResolutionPricePoint(
        pool: any,
        context: RenderingContext,
    ): PricePoint | null {

        if (this.isActualPool(pool, context)) {
            const latest = DataBuilder.getLatest(context.chartdata)
            if (latest.timestamp > pool.openPriceTimestamp) return latest
            if (latest.timestamp < pool.endDate) return latest

            return null
        }

        const isResolveReady = !pool.resolved && context.settlements?.[pool.endDate]
        if (isResolveReady) {
            return {
                value: context.settlements[pool.endDate].resolutionPrice.value,
                timestamp: context.settlements[pool.endDate].resolutionPrice.timestamp,
            }
        }

        const isResolved = pool.resolved && pool.resolutionPriceTimestamp && pool.resolutionPriceValue
        if (isResolved) {
            return {
                value: pool.resolutionPriceValue,
                timestamp: pool.resolutionPriceTimestamp,
            }
        }

        const isResolvedNoResolutionPrice = pool.resolved && (!pool.resolutionPriceTimestamp || !pool.resolutionPriceValue)
        if (isResolvedNoResolutionPrice && context.settlements?.[pool.endDate]) {
            return {
                value: context.settlements[pool.endDate].resolutionPrice.value,
                timestamp: context.settlements[pool.endDate].resolutionPrice.timestamp,
            }
        }

        const latest = DataBuilder.getLatest(context.chartdata)

        if (latest.timestamp <= pool.openPriceTimestamp) return null
        if (pool.endDate > latest.timestamp) return latest

        return this.getPoolResolutionPriceFormPricefeed(pool.endDate, context.chartdata)

    }

    protected getPoolResolutionPriceFormPricefeed(
        endDate,
        chartdata: { timestamps, prices }
    ): PricePoint | null {
        const { timestamps, prices } = chartdata

        const index = binarySearchNearest(timestamps, endDate)

        if (index === -1) return null

        return {
            timestamp: timestamps[index],
            value: prices[index],
        }

    }

    protected isActualPool(
        pool: any,
        context: RenderingContext,
    ): boolean {
        const now = context?.plotdata?.latest?.timestamp || nowUnixTS()
        const end = pool?.endDate

        return end > now
    }

    protected getLevelTextureName(context: RenderingContext): symbol {

        switch (context.metapool?.level) {
            case BRONZE:
                return BRONZE_LEVEL_TEXTURE
            case SILVER:
                return SILVER_LEVEL_TEXTURE
            case GOLD:
                return GOLD_LEVEL_TEXTURE

            default:
                Logger.error(`metapool level "${context.metapool?.level}" is not supported, fallback to SILVER`)

                return SILVER_LEVEL_TEXTURE
        }

    }

    protected abstract updatePool(pool: any, context: RenderingContext, container: Container, index: number): void

}
