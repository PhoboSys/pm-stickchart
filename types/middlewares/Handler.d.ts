import { IMiddleware } from '../interfaces';
export declare class MiddlewareHandler<T> {
    middlewares: IMiddleware<T>[];
    options: T | undefined;
    constructor(middlewares?: IMiddleware<T>[], options?: T | undefined);
    add(middleware: IMiddleware<T>): void;
    next(options: T): MiddlewareHandler<T>;
}
