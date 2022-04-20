import { MiddlewareHandler } from '../../core/core.middlewareHandler'
import { Viewport } from '../../core/core.viewport'

export interface IMiddleware<T> {
    handle(
        viewport: Viewport,
        state: T,
        handler: MiddlewareHandler<T>
    ): MiddlewareHandler<T>

    shouldSkip(state: T): boolean

    save(state: T): void
}

