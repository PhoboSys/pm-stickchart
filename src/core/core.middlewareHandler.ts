import { IMiddleware } from '../data/interfaces'

import { Viewport } from '.'

export class MiddlewareHandler<T> {
    constructor(
        public middlewares: IMiddleware<T>[] = [],
        public state: T | undefined = undefined,
    ) { }

    public next(viewport: Viewport, state: T): MiddlewareHandler<T> {
        const { middlewares } = this

        const middleware = middlewares.at(0)

        if (middleware === undefined) return this

        const nextHandler = new MiddlewareHandler<T>(middlewares.slice(1), state)

        if (middleware.shouldSkip(state)) return nextHandler.next(viewport, state)

        const handled = middleware.handle(viewport, state, nextHandler)

        middleware.save(state)

        return handled
    }
}
