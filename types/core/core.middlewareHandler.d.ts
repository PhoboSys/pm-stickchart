import { IMiddleware } from '../interfaces/interface.middleware';
import { Viewport } from '.';
export declare class MiddlewareHandler<T> {
    middlewares: IMiddleware<T>[];
    state: T | undefined;
    constructor(middlewares?: IMiddleware<T>[], state?: T | undefined);
    add(middleware: IMiddleware<T>): void;
    next(viewport: Viewport, state: T): MiddlewareHandler<T>;
}
