import { IGraphicStorage, IRenderer, LatestPriceLineRenderer } from '@rendering'
import { DoneFunction, RenderingContext } from '@rendering'
import { RenderingCompositor, PriceLineRenderer } from '@rendering'
import { GridRenderer, LatestPriceRenderer } from '@rendering'
import { Round, Prediction, CrosshairRenderer } from '@rendering'
import { PricefeedInfoRenderer } from '@rendering'

import { RoundActualBackground } from './round/RoundActualBackground'
import { RoundCountdown } from './round/RoundCountdown'

export class LineChartRenderer implements IRenderer {

    private readonly compositor: RenderingCompositor

    constructor(
        private readonly renderer: IGraphicStorage,
    ) {
        this.compositor = new RenderingCompositor([
            new RoundActualBackground(renderer),
            new RoundCountdown(renderer),
            new GridRenderer(renderer),
            new PricefeedInfoRenderer(renderer),
            new PriceLineRenderer(renderer),
            new LatestPriceLineRenderer(renderer),
            new Round(renderer),
            new LatestPriceRenderer(renderer),
            new CrosshairRenderer(renderer),
            new Prediction(renderer),
        ])
    }

    render(context: RenderingContext, done: DoneFunction): void {

        const render = this.compositor.compose(context, done)

        render()
    }

}

