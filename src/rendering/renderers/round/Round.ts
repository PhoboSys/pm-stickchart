import { IGraphicStorage, RenderingCompositor } from '@rendering'
import { RenderingContext, DoneFunction, IRenderer } from '@rendering'

import { RoundBackground } from './RoundBackground'
import { RoundOpen } from './RoundOpen'
import { RoundResolution } from './RoundResolution'
import { RoundResolutionLine } from './RoundResolutionLine'
import { RoundResolutionChartLine } from './RoundResolutionChartLine'
import { RoundOpenPriceTag } from './RoundOpenPriceTag'
import { RoundResolutionPriceTag } from './RoundResolutionPriceTag'
import { RoundLayerEventProducer } from './RoundLayerEventProducer'

export class Round implements IRenderer {

    private readonly compositor: RenderingCompositor

    constructor(
        private readonly renderer: IGraphicStorage
    ) {
        this.compositor = new RenderingCompositor([
            new RoundLayerEventProducer(renderer),
            new RoundBackground(renderer),
            new RoundOpen(renderer),
            new RoundResolution(renderer),
            new RoundResolutionLine(renderer),
            new RoundResolutionChartLine(renderer),
            new RoundResolutionPriceTag(renderer),
            new RoundOpenPriceTag(renderer),
        ])
    }

    render(context: RenderingContext, done: DoneFunction): void {

        const render = this.compositor.compose(context, done)

        render()
    }

}
