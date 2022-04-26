import {
    IGraphicRenderer,
    DoneFunction,
    RenderingContext,
    IRenderer,
    RenderingCompositor,
} from '..'

import { LatestPriceLineRenderer } from './LatestPriceLineRenderer'
import { LatestPricePointRenderer } from './LatestPricePointRenderer'

export class LatestPriceRenderer implements IRenderer {

    private readonly compositor: RenderingCompositor

    constructor(
        private readonly renderer: IGraphicRenderer,
    ) {
        this.compositor = new RenderingCompositor([
            new LatestPriceLineRenderer(renderer),
            new LatestPricePointRenderer(renderer),
        ])
    }

    render(context: RenderingContext, done: DoneFunction): void {

        const render = this.compositor.compose(context, done)

        render()
    }

}

