import config from '@config'
import { Logger } from '@infra'
import { RenderingContext, GraphicUtils } from '@rendering'

import datamath from '@lib/datamath'
import { Container } from '@lib/pixi'

import { SILVER, GOLD, ROYAL } from '@constants'

import { BasePoolsRenderer } from './BasePoolsRenderer'

export class PoolResolution extends BasePoolsRenderer {

    static readonly POOL_RESOLUTION_ID: symbol = Symbol('POOL_RESOLUTION_ID')

    private lineStyle: any = {
        width: 1,
        join: 'round',
        cap: 'round',
        gap: 8,
        dash: 6,
        alpha: 0.5,
    }

    public get rendererId(): symbol {
        return PoolResolution.POOL_RESOLUTION_ID
    }

    protected updatePool(
        pool: any,
        context: RenderingContext,
        container: Container,
    ): void {

        if (this.isHistoricalPool(pool, context)) return this.clear()

        this.updateActualPool(pool, context, container)

    }

    private updateActualPool(
        pool: any,
        context: RenderingContext,
        container: Container
    ): void {

        const {
            width,
            height
        } = context.screen

        const { timerange } = context.plotdata
        const [x] = datamath.scale([pool.endDate], timerange, width)

        const [line, linestate] = this.get('line', () => GraphicUtils.createVerticalDashLine(
            0,
            [0, height],
            { ...this.lineStyle, color: this.getLevelLineColor(context) },
        ))

        line.position.x = x
        line.height = height

        if (linestate.new) container.addChild(line)

    }

    private getLevelLineColor(context: RenderingContext): number {

        switch (context.metapool?.level) {
            case SILVER:
                return config.style.levels.silverLineColor
            case GOLD:
                return config.style.levels.goldLineColor
            case ROYAL:
                return config.style.levels.royalLineColor

            default:
                Logger.error(`metapool level "${context.metapool?.level}" is not supported, fallback to SILVER`)

                return config.style.levels.silverLineColor
        }

    }

}
