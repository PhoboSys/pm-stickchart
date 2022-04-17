import { RenderingContext, RenderingCompositor } from '..'
import { IGraphicRenderer, IRenderer, DoneFunction } from '..'
import { HorizontalGridRenderer, VerticalGridRenderer } from '..'

export class GridRenderer implements IRenderer {

    private readonly compositor: RenderingCompositor

    constructor(
       private readonly renderer: IGraphicRenderer
    ) {
        this.compositor = new RenderingCompositor([
            new HorizontalGridRenderer(renderer),
            new VerticalGridRenderer(renderer),
        ])
    }

    public render(
        context: RenderingContext,
        done: DoneFunction
    ): void {

        const render = this.compositor.compose(context, done)
        render()
    }

}

