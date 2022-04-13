import { IMiddleware } from '../data/interfaces';
import { Viewport } from '.';
export declare class MiddlewareHandler<T> {
    middlewares: IMiddleware<T>[];
    state: T | undefined;
    constructor(middlewares?: IMiddleware<T>[], state?: T | undefined);
    next(viewport: Viewport, state: T): MiddlewareHandler<T>;
}
