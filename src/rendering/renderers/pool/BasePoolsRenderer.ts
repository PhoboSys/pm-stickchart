import { Logger } from '@infra'

import { RenderingContext, BaseRenderer } from '@rendering'
import { SILVER_LEVEL_TEXTURE, GOLD_LEVEL_TEXTURE, ROYAL_LEVEL_TEXTURE } from '@rendering/textures/symbols'

import { Container } from '@lib/pixi'
import { isEmpty, forEach, nowUnixTS } from '@lib/utils'
import { PricePoint, DataBuilder } from '@chartdata'
import { EPosition } from '@enums'

import { PRIZEFUNDS } from '@constants'
import { SILVER, GOLD, ROYAL } from '@constants'

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

    protected getPoolResolutionByPrice(
        pool: any,
        resolutionPrice: PricePoint | null,
    ): EPosition {

        if (!resolutionPrice) return EPosition.Undefined
        if (resolutionPrice.value === Number(pool.openPriceValue)) return EPosition.Zero
        if (resolutionPrice.value > pool.openPriceValue) return EPosition.Up
        if (resolutionPrice.value < pool.openPriceValue) return EPosition.Down

        return EPosition.Undefined
    }

    private isNoContestPool(
        pool: any,
        context: RenderingContext,
    ): boolean {

        if (this.isActualPool(pool)) {
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

        if (this.isActualPool(pool)) return false

        return (
            pool.resolved ||
            context.settlements?.[pool.endDate]
        )
    }

    protected getResolutionPricePoint(
        pool: any,
        context: RenderingContext,
    ): PricePoint | null {

        if (this.isActualPool(pool)) {
            return DataBuilder.getLatest(context.chartdata)
        }

        const isResolveReady = !pool.resolved && context.settlements?.[pool.endDate]
        if (isResolveReady) {
            return {
                value: context.settlements[pool.endDate].resolutionPrice.value,
                timestamp: context.settlements[pool.endDate].resolutionPrice.timestamp,
            }
        }

        const nocontest = this.isNoContestPool(pool, context)
        if (nocontest && context.settlements?.[pool.endDate]) {
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

        const latest = DataBuilder.getLatest(context.chartdata)
        if (pool.endDate > latest.timestamp) {
            return latest
        }

        return this.getPoolResolutionPriceFormPricefeed(pool.endDate, context.chartdata)

    }

    getPoolResolutionPriceFormPricefeed(
        endDate,
        chartdata: { timestamps, prices }
    ): PricePoint | null {
        const { timestamps, prices } = chartdata

        let midIndex = Math.floor(timestamps.length / 2)
        let start = 0
        let end = timestamps.length - 1
        let index: number | null = null

        while (true) {
            if (timestamps[midIndex] === endDate) {
                index = midIndex
                break
            } else if (end - start === 1) {
                if (timestamps[end] <= endDate) {
                    index = end
                } else if (timestamps[start] <= endDate) {
                    index = start
                }
                break
            } else if (timestamps[midIndex] < endDate) {
                start = midIndex
                midIndex = Math.floor((end + start) / 2)
            } else if (timestamps[midIndex] > endDate) {
                end = midIndex
                midIndex = Math.floor((end + start) / 2)
            }
        }

        if (index === null) return null

        return {
            timestamp: timestamps[index],
            value: prices[index],
        }

    }

    protected isActualPool(
        pool: any,
    ): boolean {
        return pool.endDate > nowUnixTS()
    }

    protected getLevelTextureName(context: RenderingContext): symbol {

        switch (context.metapool?.level) {
            case SILVER:
                return SILVER_LEVEL_TEXTURE
            case GOLD:
                return GOLD_LEVEL_TEXTURE
            case ROYAL:
                return ROYAL_LEVEL_TEXTURE

            default:
                Logger.error(`metapool level "${context.metapool?.level}" is not supported, fallback to SILVER`)

                return SILVER_LEVEL_TEXTURE
        }

    }

    protected abstract updatePool(pool: any, context: RenderingContext, container: Container, index: number): void

}
