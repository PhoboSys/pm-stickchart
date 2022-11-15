import { IGraphicStorage, RenderingContext, DoneFunction, IRenderer } from '@rendering';
export declare class Pool implements IRenderer {
    private readonly renderer;
    private readonly compositor;
    constructor(renderer: IGraphicStorage);
    render(context: RenderingContext, done: DoneFunction): void;
}
