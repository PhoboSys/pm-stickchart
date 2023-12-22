import { IGraphicStorage, RenderingCompositor } from '@rendering'
import { RenderingContext, DoneFunction, IRenderer } from '@rendering'

import { PoolBackground } from './PoolBackground'
import { PoolOpen } from './PoolOpen'
import { PoolResolution } from './PoolResolution'
import { PoolResolutionLine } from './PoolResolutionLine'
import { PoolResolutionChartLine } from './PoolResolutionChartLine'
import { PoolOpenPriceTag } from './PoolOpenPriceTag'
import { PoolResolutionPriceTag } from './PoolResolutionPriceTag'
import { PoolLayerEventProducer } from './PoolLayerEventProducer'

export class Pool implements IRenderer {

    private readonly compositor: RenderingCompositor

    constructor(
        private readonly renderer: IGraphicStorage
    ) {
        this.compositor = new RenderingCompositor([
            new PoolLayerEventProducer(renderer),
            new PoolBackground(renderer),
            new PoolOpen(renderer),
            new PoolResolution(renderer),
            new PoolResolutionLine(renderer),
            new PoolResolutionChartLine(renderer),
            new PoolResolutionPriceTag(renderer),
            new PoolOpenPriceTag(renderer),
        ])
    }

    render(context: RenderingContext, done: DoneFunction): void {

        const render = this.compositor.compose(context, done)

        render()
    }

}
