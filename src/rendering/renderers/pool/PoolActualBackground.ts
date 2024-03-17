import { RenderingContext } from '@rendering'

import config from '@config'
import datamath from '@lib/datamath'
import { Graphics, Container } from '@lib/pixi'

import { BasePoolsRenderer } from './BasePoolsRenderer'

export class PoolActualBackground extends BasePoolsRenderer {

    static readonly POOL_ACTUAL_BACKGROUND_ID: symbol = Symbol('POOL_ACTUAL_BACKGROUND_ID')

    public get rendererId(): symbol {
        return PoolActualBackground.POOL_ACTUAL_BACKGROUND_ID
    }

    protected updatePool(
        pool: any,
        context: RenderingContext,
        container: Container,
    ): void {

        if (!pool.openPriceTimestamp || !pool.openPriceValue || !this.isActualPool(pool, context)) return this.clear()

        this.updateBackground(pool, context, container)

    }

    private updateBackground(
        pool: any,
        context: RenderingContext,
        container: Container,
    ): void {

        const {
            width,
            height,
        } = context.screen

        const { timerange } = context.plotdata
        const { openPriceTimestamp, endDate } = pool

        const [ox, rx] = datamath.scale([openPriceTimestamp, endDate], timerange, width)

        const shape = [
            ox, 0,
            rx, 0,
            rx, height,
            ox, height,
        ]

        const [background, backgroundState] = this.get('background', () => new Graphics())
        if (backgroundState.new) container.addChild(background)

        background
            .clear()
            .beginFill(config.style.poolActualRoundColor, 0.1)
            .drawPolygon(shape)
            .closePath()
            .endFill()

    }

}
