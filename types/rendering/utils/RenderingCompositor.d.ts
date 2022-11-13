import { IRenderer, RenderingContext, DoneFunction } from '@rendering';
export declare class RenderingCompositor {
    private readonly renderers;
    constructor(renderers: Array<IRenderer>);
    compose(context: RenderingContext, next?: DoneFunction): DoneFunction;
    private create;
}
