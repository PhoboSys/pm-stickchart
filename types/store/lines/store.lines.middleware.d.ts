import { MiddlewareHandler } from '../../core/core.middlewareHandler';
import { Viewport } from '../../core/core.viewport';
import { IMiddleware, IState } from '../../data/interfaces';
export declare class LinesViewMiddleware implements IMiddleware<IState> {
    handle(viewport: Viewport, state: IState, handler: MiddlewareHandler<IState>): MiddlewareHandler<IState>;
    shouldSkip(state: IState): boolean;
    save(state: IState): void;
}
