import { RenderingContext } from '..';
import { IGraphicRenderer, IRenderer, DoneFunction } from '..';
export declare class GridRenderer implements IRenderer {
    private readonly renderer;
    private readonly compositor;
    constructor(renderer: IGraphicRenderer);
    render(context: RenderingContext, done: DoneFunction): void;
}
