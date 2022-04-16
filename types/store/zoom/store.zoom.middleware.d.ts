import { Viewport, MiddlewareHandler } from '../../core';
import { IMiddleware, IState } from '../../data/interfaces';
export declare class ZoomHandleMiddleware implements IMiddleware<IState> {
    handle(viewport: Viewport, state: IState, handler: MiddlewareHandler<IState>): MiddlewareHandler<IState>;
    shouldSkip(state: IState): boolean;
    save(state: IState): void;
}
