import { IGraphicRenderer } from '..'
import { DoneFunction, RenderingContext, IRenderer } from '..'
import { PriceLineRenderer, GridRenderer, RenderingCompositor } from '..'
import { LatestPriceLineRenderer } from '..'
import { PoolRenderer } from './PoolRenderer';
import { CrosshairRenderer } from './CrosshairRenderer';
import { LatestPricePointRenderer } from './LatestPricePointRenderer';

export class LineChartRenderer implements IRenderer {

    private readonly compositor: RenderingCompositor

    constructor (
       private readonly renderer: IGraphicRenderer
    ) {
        this.compositor = new RenderingCompositor([
            new GridRenderer(renderer),
            new PriceLineRenderer(renderer),
            new LatestPriceLineRenderer(renderer),
            new LatestPricePointRenderer(renderer),
            new PoolRenderer(renderer),
            new CrosshairRenderer(renderer),
        ])
    }

    render(context: RenderingContext, done: DoneFunction): void {

        const render = this.compositor.compose(context, done)

        render()
    }

}

