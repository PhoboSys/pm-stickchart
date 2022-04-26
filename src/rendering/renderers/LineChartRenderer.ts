import {
    DoneFunction,
    RenderingContext,
    IRenderer,
    PriceLineRenderer,
    GridRenderer,
    RenderingCompositor,
    PoolRenderer,
    LatestPriceRenderer,
    IGraphicRenderer,
} from '..'

export class LineChartRenderer implements IRenderer {

    private readonly compositor: RenderingCompositor

    constructor(
        private readonly renderer: IGraphicRenderer,
    ) {
        this.compositor = new RenderingCompositor([
            new GridRenderer(renderer),
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

