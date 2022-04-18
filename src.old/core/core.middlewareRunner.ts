import { IMiddleware } from '../data/interfaces'

import { MiddlewareHandler } from './core.middlewareHandler'

import { Viewport } from '.'

export class MiddlewareRunner<T> {
    constructor(
        public middlewares: IMiddleware<T>[] = [],
    ) { }

    public add(middleware: IMiddleware<T>): void {
        this.middlewares.push(middleware)
    }

    public run(viewport: Viewport, state: T): MiddlewareHandler<T> {
        const handler = new MiddlewareHandler(this.middlewares)

        return handler.next(viewport, state)
    }
}
