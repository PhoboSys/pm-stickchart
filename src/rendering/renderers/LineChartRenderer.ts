import { IGraphicRenderer } from '..'
import { DoneFunction, RenderingContext, IRenderer } from '..'
import { PriceLineRenderer, GridRenderer, RenderingCompositor } from '..'
import { LatestPriceRenderer } from '..'
import { PoolRenderer } from './PoolRenderer';
import { CrosshairRenderer } from './CrosshairRenderer';

export class LineChartRenderer implements IRenderer {

    private readonly compositor: RenderingCompositor

    constructor (
       private readonly renderer: IGraphicRenderer
    ) {
        this.compositor = new RenderingCompositor([
            new GridRenderer(renderer),
            new PriceLineRenderer(renderer),
            new LatestPriceRenderer(renderer),
            new PoolRenderer(renderer),
            new CrosshairRenderer(renderer),
        ])
    }

    render(context: RenderingContext, done: DoneFunction): void {

        const render = this.compositor.compose(context, done)

        render()
    }

}

