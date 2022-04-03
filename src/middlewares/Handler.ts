import { IMiddleware } from '../interfaces'

export class MiddlewareHandler<T> {
    middlewares: IMiddleware<T>[]

    options: T | undefined

    constructor(middlewares: IMiddleware<T>[] = [], options: T | undefined = undefined) {
        this.middlewares = middlewares

        this.options = options
    }

    add(middleware: IMiddleware<T>): void {
        this.middlewares.push(middleware)
    }

    next(options: T): MiddlewareHandler<T> {
        const { middlewares } = this

        const next = middlewares.at(0)

        return next?.handle(options, new MiddlewareHandler(middlewares.slice(1), options)) ?? this
    }
}

