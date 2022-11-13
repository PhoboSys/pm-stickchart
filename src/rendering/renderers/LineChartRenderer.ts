import {
    IGraphicStorage,
    IRenderer,
    DoneFunction,
    RenderingContext,
    RenderingCompositor,
    PriceLineRenderer,
    GridRenderer,
    LatestPriceRenderer,
    Pool,
    Pari,
    CrosshairRenderer
} from '@rendering'

export class LineChartRenderer implements IRenderer {

    private readonly compositor: RenderingCompositor

    constructor(
        private readonly renderer: IGraphicStorage,
    ) {
        this.compositor = new RenderingCompositor([
            new GridRenderer(renderer),
            new PriceLineRenderer(renderer),
            new Pool(renderer),
            new LatestPriceRenderer(renderer),
            new CrosshairRenderer(renderer),
            new Pari(renderer),
        ])
    }

    render(context: RenderingContext, done: DoneFunction): void {

        const render = this.compositor.compose(context, done)

        render()
    }

}

