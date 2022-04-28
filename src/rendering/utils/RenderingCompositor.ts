import { IRenderer, RenderingContext, DoneFunction } from '..'

export class RenderingCompositor {

    constructor(
        private readonly renderers: Array<IRenderer>
    ) { }

    public compose(
        context: RenderingContext,
        next: DoneFunction = () => {}
    ): DoneFunction {

        let prevnext = next

        let idx = this.renderers.length
        while (--idx >= 0) {
            const renderer = this.renderers[idx]
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


