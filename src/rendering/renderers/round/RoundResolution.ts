import config from '@config'
import { Logger } from '@infra'
import { RenderingContext, GraphicUtils } from '@rendering'

import datamath from '@lib/datamath'
import { Container } from '@lib/pixi'

import { SILVER, GOLD, BRONZE } from '@constants'

import { BaseRoundsRenderer } from './BaseRoundsRenderer'

export class RoundResolution extends BaseRoundsRenderer {

    static readonly ROUND_RESOLUTION_ID: symbol = Symbol('ROUND_RESOLUTION_ID')

    private lineStyle: any = {
        width: 1,
        join: 'round',
        cap: 'round',
        gap: 8,
        dash: 6,
        alpha: 0.5,
    }

    public get rendererId(): symbol {
        return RoundResolution.ROUND_RESOLUTION_ID
    }

    protected updateRound(
        round: any,
        context: RenderingContext,
        container: Container,
    ): void {

        if (this.isHistoricalRound(round, context)) return this.clear()

        this.updateActualRound(round, context, container)

    }

    private updateActualRound(
        round: any,
        context: RenderingContext,
        container: Container
    ): void {

        const {
            width,
            height
        } = context.screen

        const { timerange } = context.plotdata
        const [x] = datamath.scale([round.endDate], timerange, width)

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

        switch (context.game?.level) {
            case BRONZE:
                return config.style.levels.bronzeLineColor
            case SILVER:
                return config.style.levels.silverLineColor
            case GOLD:
                return config.style.levels.goldLineColor

            default:
                Logger.error(`game level "${context.game?.level}" is not supported, fallback to SILVER`)

                return config.style.levels.silverLineColor
        }

    }

}
