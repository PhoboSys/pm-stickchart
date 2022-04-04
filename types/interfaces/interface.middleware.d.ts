import { MiddlewareHandler } from '../core/core.middlewareHandler';
import { Viewport } from '../core/core.viewport';
export interface IMiddleware<T> {
    lastState: T | undefined;
    handle(viewport: Viewport, state: T, handler: MiddlewareHandler<T>): MiddlewareHandler<T>;
}
