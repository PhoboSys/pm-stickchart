import { MiddlewareHandler } from '../middlewares/'

export interface IMiddleware<T> {
    handle(options: T, handler: MiddlewareHandler<T>): MiddlewareHandler<T>
}

