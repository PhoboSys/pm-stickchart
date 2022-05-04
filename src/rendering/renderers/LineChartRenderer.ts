import { IGraphicStorage, IRenderer } from '..'
import { DoneFunction, RenderingContext, RenderingCompositor } from '..'
import { PriceLineRenderer, GridRenderer, PariResolvedRenderer } from '..'
import { LatestPriceRenderer, PoolRenderer, PariResolutionRenderer } from '..';

export class LineChartRenderer implements IRenderer {

    private readonly compositor: RenderingCompositor

    constructor(
        private readonly renderer: IGraphicStorage,
    ) {
        this.compositor = new RenderingCompositor([
            new GridRenderer(renderer),
            new PriceLineRenderer(renderer),
            new PariResolutionRenderer(renderer),
            new PoolRenderer(renderer),
            new LatestPriceRenderer(renderer),
            new PariResolvedRenderer(renderer),
        ])
    }

    render(context: RenderingContext, done: DoneFunction): void {

        const render = this.compositor.compose(context, done)

        render()
    }

}

