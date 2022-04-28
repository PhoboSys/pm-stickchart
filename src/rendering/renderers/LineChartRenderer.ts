import { IGraphicStorage } from '..'
import { DoneFunction, RenderingContext, IRenderer } from '..'
import { PriceLineRenderer, GridRenderer, RenderingCompositor } from '..'
import { LatestPriceRenderer, PoolRenderer, PariResolutionRenderer } from '..';

export class LineChartRenderer implements IRenderer {

    private readonly compositor: RenderingCompositor

    constructor (
       private readonly renderer: IGraphicStorage
    ) {
        this.compositor = new RenderingCompositor([
            new GridRenderer(renderer),
            new PariResolutionRenderer(renderer),
            new PriceLineRenderer(renderer),
            new PoolRenderer(renderer),
            new LatestPriceRenderer(renderer),
        ])
    }

    render(context: RenderingContext, done: DoneFunction): void {

        const render = this.compositor.compose(context, done)

        render()
    }

}

