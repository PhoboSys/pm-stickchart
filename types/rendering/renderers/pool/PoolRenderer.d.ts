import { IGraphicStorage } from '../..';
import { RenderingContext, DoneFunction, IRenderer } from '../..';
export declare class PoolRenderer implements IRenderer {
    private readonly renderer;
    private readonly compositor;
    constructor(renderer: IGraphicStorage);
    render(context: RenderingContext, done: DoneFunction): void;
}
