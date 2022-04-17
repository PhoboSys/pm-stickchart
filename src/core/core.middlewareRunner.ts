import { OutputEventTypes } from '../data/enums/enum.outputEventTypes'
import { IMiddleware, IState } from '../data/interfaces'

import { MiddlewareHandler } from './core.middlewareHandler'

import { Viewport, EventEmitter } from '.'
export class MiddlewareRunner {
    constructor(
        public middlewares: IMiddleware[] = [],
    ) { }

    public add(middleware: IMiddleware): void {
        this.middlewares.push(middleware)
    }

    public run(viewport: Viewport, eventEmitter: EventEmitter<OutputEventTypes>, state: IState): MiddlewareHandler {
        const handler = new MiddlewareHandler(this.middlewares)

        return handler.next(viewport, eventEmitter, state)
    }
}
