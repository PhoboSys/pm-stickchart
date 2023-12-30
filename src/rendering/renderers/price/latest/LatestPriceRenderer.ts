import { IGraphicStorage } from '@rendering'
import { DoneFunction, RenderingContext, IRenderer } from '@rendering'
import { RenderingCompositor } from '@rendering'

import { LatestPriceLineRenderer } from './LatestPriceLineRenderer'
import { LatestPricePointRenderer } from './LatestPricePointRenderer'
import { LatestPriceTagRenderer } from './LatestPriceTagRenderer'

export class LatestPriceRenderer implements IRenderer {

    private readonly compositor: RenderingCompositor

    constructor(
        private readonly renderer: IGraphicStorage,
    ) {
        this.compositor = new RenderingCompositor([
            new LatestPriceLineRenderer(renderer),
            new LatestPricePointRenderer(renderer),
            new LatestPriceTagRenderer(renderer),
        ])
    }

    render(context: RenderingContext, done: DoneFunction): void {

        const render = this.compositor.compose(context, done)

        render()
    }

}

