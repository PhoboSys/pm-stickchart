import { IGraphicStorage, IRenderer } from '..';
import { DoneFunction, RenderingContext } from '..';
export declare class LineChartRenderer implements IRenderer {
    private readonly renderer;
    private readonly compositor;
    constructor(renderer: IGraphicStorage);
    render(context: RenderingContext, done: DoneFunction): void;
}
