import { IGraphicStorage, IRenderer } from '@rendering';
import { DoneFunction, RenderingContext } from '@rendering';
export declare class LineChartRenderer implements IRenderer {
    private readonly renderer;
    private readonly compositor;
    constructor(renderer: IGraphicStorage);
    render(context: RenderingContext, done: DoneFunction): void;
}
