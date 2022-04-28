import { RenderingContext } from '..';
import { IGraphicStorage, IRenderer, DoneFunction } from '..';
export declare class GridRenderer implements IRenderer {
    private readonly renderer;
    private readonly compositor;
    constructor(renderer: IGraphicStorage);
    render(context: RenderingContext, done: DoneFunction): void;
}
