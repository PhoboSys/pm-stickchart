import { IMiddleware } from '../interfaces/interface.middleware'

import { Viewport } from '.'

export class MiddlewareHandler<T> {
    constructor(
        public middlewares: IMiddleware<T>[] = [],
        public state: T | undefined = undefined,
    ) { }

    add(middleware: IMiddleware<T>): void {
        this.middlewares.push(middleware)
    }

    next(viewport: Viewport, state: T): MiddlewareHandler<T> {
        const { middlewares } = this

        const next = middlewares.at(0)

        return next?.handle(viewport, state, new MiddlewareHandler<T>(middlewares.slice(1), state)) ?? this
    }
}
