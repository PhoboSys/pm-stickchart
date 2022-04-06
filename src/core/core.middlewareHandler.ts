import { IMiddleware } from '../interfaces'

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

        const handler = new MiddlewareHandler<T>(middlewares.slice(1), state)

        if (middleware.skip(state)) return handler.next(viewport, state)

        return middleware.handle(viewport, state, handler)
    }
}
