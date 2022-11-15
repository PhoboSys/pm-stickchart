import { IGraphicStorage } from '../../../../rendering';
import { DoneFunction, RenderingContext, IRenderer } from '../../../../rendering';
export declare class PariResolutionRenderer implements IRenderer {
    private readonly renderer;
    private readonly compositor;
    constructor(renderer: IGraphicStorage);
    render(context: RenderingContext, done: DoneFunction): void;
}
