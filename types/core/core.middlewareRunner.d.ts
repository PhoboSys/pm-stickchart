import { IMiddleware } from '../data/interfaces';
import { MiddlewareHandler } from './core.middlewareHandler';
import { Viewport } from '.';
export declare class MiddlewareRunner<T> {
    middlewares: IMiddleware<T>[];
    constructor(middlewares?: IMiddleware<T>[]);
    add(middleware: IMiddleware<T>): void;
    run(viewport: Viewport, state: T): MiddlewareHandler<T>;
}
