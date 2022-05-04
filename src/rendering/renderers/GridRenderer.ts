import { RenderingContext, RenderingCompositor } from '..'
import { IGraphicStorage, IRenderer, DoneFunction } from '..'
import { HorizontalGridRenderer, VerticalGridRenderer } from '..'

export class GridRenderer implements IRenderer {

    private readonly compositor: RenderingCompositor

    constructor(
        private readonly renderer: IGraphicStorage,
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

