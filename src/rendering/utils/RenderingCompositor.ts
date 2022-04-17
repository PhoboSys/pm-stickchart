import { IRenderer, RenderingContext, DoneFunction } from '..'

export class RenderingCompositor {

    constructor(
        private readonly renderers: Array<IRenderer>
    ) { }

    public use(renderer: IRenderer): void {
        this.renderers.push(renderer)
    }

    public compose(
        context: RenderingContext,
        next: DoneFunction = () => {}
    ): DoneFunction {

        let prevnext = next

        for (const renderer of this.renderers.reverse()) {
            prevnext = this.create(context, renderer, prevnext)
        }

        return prevnext

    }

    private create(
        context: RenderingContext,
        renderer: IRenderer,
        next: DoneFunction
    ): () => void {
        return () => renderer.render(context, next)
    }

}


