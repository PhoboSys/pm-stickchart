import { RenderingContext, BaseRenderer } from '@rendering'

import { Container } from '@lib/pixi'
import { isEmpty, forEach, nowUnixTS } from '@lib/utils'
import { PricePoint, DataBuilder } from '@chartdata'
import { EPosition } from '@enums'

import { PRIZEFUNDS } from '@constants'

export abstract class BasePoolsRenderer extends BaseRenderer {

    protected prevpools: { [key:string]: string } = {}

    protected newpools: { [key:string]: string } = {}

    protected update(
        context: RenderingContext,
        layer: Container,
    ): Container {
        if (isEmpty(context.pools)) {
            this.cleanup(context)

            return layer
        }

        this.updateEachPool(context, layer)
        this.cleanup(context)

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

    private cleanup(context: RenderingContext): void {

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
        if (resolutionPrice.value === pool.openPriceValue) return EPosition.Zero
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

            // TODO: Implement Early Pool Resolution with NoContest
            // if (this._isNoContestEmptyPool(pool)) return true
        }

        if (this.isNoContestEmptyPool(pool)) return true

        if (!this.isHistoricalPool(pool, context)) return false
        if (pool.resolved && pool.resolution === EPosition.NoContest) return true

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

        return null

    }

    protected isActualPool(
        pool: any,
    ): boolean {
        return pool.endDate > nowUnixTS()
    }

    protected abstract updatePool(pool: any, context: RenderingContext, container: Container, index: number): void

}
