import { Graphics } from '../../lib/pixi';
import { IRenderer, IGraphicRenderer } from '..';
import { RenderingContext, DoneFunction } from '..';
export declare abstract class BaseRenderer implements IRenderer {
    protected readonly renderer: IGraphicRenderer;
    constructor(renderer: IGraphicRenderer);
    render(context: RenderingContext, done: DoneFunction): void;
    abstract get rendererId(): symbol;
    protected abstract create(context: RenderingContext): Graphics;
}
