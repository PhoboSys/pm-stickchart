import { IGraphicRenderer } from '..';
import { DoneFunction, RenderingContext, IRenderer } from '..';
export declare class LatestPriceRenderer implements IRenderer {
    private readonly renderer;
    private readonly compositor;
    constructor(renderer: IGraphicRenderer);
    render(context: RenderingContext, done: DoneFunction): void;
}
