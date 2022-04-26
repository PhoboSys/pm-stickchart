import {
    RenderingContext,
    RenderingCompositor,
    HorizontalGridRenderer,
    VerticalGridRenderer,
    IGraphicRenderer,
    IRenderer,
    DoneFunction,
} from '..'

export class GridRenderer implements IRenderer {

    private readonly compositor: RenderingCompositor

    constructor(
        private readonly renderer: IGraphicRenderer,
    ) {
        this.compositor = new RenderingCompositor([
            new VerticalGridRenderer(renderer),
            new HorizontalGridRenderer(renderer),
        ])
    }

    public render(
        context: RenderingContext,
        done: DoneFunction,
    ): void {

        const render = this.compositor.compose(context, done)

        render()
    }

}

