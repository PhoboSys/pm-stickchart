import { Viewport, MiddlewareHandler } from '../../core';
import { IMiddleware, IState } from '../../data/interfaces';
export declare class ScrollHandleMiddleware implements IMiddleware<IState> {
    private lastEvent?;
    handle(viewport: Viewport, state: IState, handler: MiddlewareHandler<IState>): MiddlewareHandler<IState>;
    shouldSkip(state: IState): boolean;
    save(state: IState): void;
}
