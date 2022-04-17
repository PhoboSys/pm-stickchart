import { IGraphicRenderer } from '..'
import { DoneFunction, RenderingContext, IRenderer } from '..'
import { PriceLineRenderer, GridRenderer, RenderingCompositor } from '..'

export class LineChartRenderer implements IRenderer {

    private readonly compositor: RenderingCompositor

    constructor (
       private readonly renderer: IGraphicRenderer
    ) {
        this.compositor = new RenderingCompositor([
            new GridRenderer(renderer),
            new PriceLineRenderer(renderer)
        ])
    }

    render(context: RenderingContext, done: DoneFunction): void {

        const render = this.compositor.compose(context, done)

        render()
    }

}

