import {
    IRenderer,
    IGraphicRenderer,
    RenderingContext,
    DoneFunction,
} from '..'
import { Graphics } from '../../lib/pixi'

export abstract class BaseRenderer implements IRenderer {

    constructor(
        protected readonly renderer: IGraphicRenderer,
    ) { }

    public render(
        context: RenderingContext,
        done: DoneFunction,
    ): void {

        this.renderer.render(
            this.create(context),
            this.rendererId,
        )

        done()
    }

    public abstract get rendererId(): symbol
    protected abstract create(context: RenderingContext): Graphics
}
