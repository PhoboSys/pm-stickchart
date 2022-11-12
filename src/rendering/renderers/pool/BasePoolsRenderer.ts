import config from '../../../config'

import { RenderingContext } from '../..'
import { BaseRenderer } from '../..'

import { Container } from '../../../lib/pixi'
import { isEmpty, forEach, nowUnixTS } from '../../../lib/utils'
import { PricePoint, DataBuilder } from '../../../chartdata'
import { EPosition } from '../../../enums'

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

    protected isHistoricalPool(
        pool: any,
        context: RenderingContext,
    ): boolean {

        if (this.isActualPool(pool)) return false

        return (
            pool.resolved ||
            context.settlements?.[pool.poolid]
        )
    }

    protected getResolutionPricePoint(
        pool: any,
        context: RenderingContext,
    ): PricePoint | null {

        if (this.isActualPool(pool)) {
            return DataBuilder.getLatest(context.plotdata)
        }

        const isResolveReady = !pool.resolved && context.settlements?.[pool.poolid]
        if (isResolveReady) {
            return {
                value: context.settlements[pool.poolid].resolutionPrice.value,
                timestamp: context.settlements[pool.poolid].resolutionPrice.timestamp,
            }
        }

        const isResolved = pool.resolved && pool.resolutionPriceTimestamp && pool.resolutionPriceValue
        if (isResolved) {
            return {
                value: pool.resolutionPriceValue,
                timestamp: pool.resolutionPriceTimestamp,
            }
        }

        const latest = DataBuilder.getLatest(context.plotdata)
        if (pool.resolutionDate > latest.timestamp) {
            return latest
        }

        return null

    }

    protected isActualPool(
        pool: any,
    ): boolean {
        return pool.resolutionDate > nowUnixTS()
    }

    protected abstract updatePool(pool: any, context: RenderingContext, container: Container, index: number): void

}
