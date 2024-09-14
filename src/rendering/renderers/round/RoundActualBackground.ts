import { RenderingContext } from '@rendering'

import config from '@config'
import datamath from '@lib/datamath'
import { Graphics, Container } from '@lib/pixi'

import { BaseRoundsRenderer } from './BaseRoundsRenderer'

export class RoundActualBackground extends BaseRoundsRenderer {

    static readonly ROUND_ACTUAL_BACKGROUND_ID: symbol = Symbol('ROUND_ACTUAL_BACKGROUND_ID')

    public get rendererId(): symbol {
        return RoundActualBackground.ROUND_ACTUAL_BACKGROUND_ID
    }

    protected updateRound(
        round: any,
        context: RenderingContext,
        container: Container,
    ): void {

        if (!round.entryPriceTimestamp || !round.entryPriceValue || !this.isActualRound(round, context)) return this.clear()

        this.updateBackground(round, context, container)

    }

    private updateBackground(
        round: any,
        context: RenderingContext,
        container: Container,
    ): void {

        const {
            width,
            height,
        } = context.screen

        const { timerange } = context.plotdata
        const { entryPriceTimestamp, endDate } = round

        const [ox, rx] = datamath.scale([entryPriceTimestamp, endDate], timerange, width)

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
            .beginFill(config.style.roundActualRoundColor, 0.1)
            .drawPolygon(shape)
            .closePath()
            .endFill()

    }

}
