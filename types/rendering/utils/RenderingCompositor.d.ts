import { IRenderer, RenderingContext, DoneFunction } from '..';
export declare class RenderingCompositor {
    private readonly renderers;
    constructor(renderers: Array<IRenderer>);
    compose(context: RenderingContext, next?: DoneFunction): DoneFunction;
    private create;
}
