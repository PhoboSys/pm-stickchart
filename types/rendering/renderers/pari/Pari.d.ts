import { IGraphicStorage } from '../..';
import { RenderingContext, DoneFunction, IRenderer } from '../..';
export declare class Pari implements IRenderer {
    private readonly renderer;
    private readonly compositor;
    constructor(renderer: IGraphicStorage);
    render(context: RenderingContext, done: DoneFunction): void;
}