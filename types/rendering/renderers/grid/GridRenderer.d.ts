import { RenderingContext } from '@rendering';
import { IGraphicStorage, IRenderer, DoneFunction } from '@rendering';
export declare class GridRenderer implements IRenderer {
    private readonly renderer;
    private readonly compositor;
    constructor(renderer: IGraphicStorage);
    render(context: RenderingContext, done: DoneFunction): void;
}
