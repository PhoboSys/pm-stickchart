import { OutputEventTypes } from '../data/enums/enum.outputEventTypes'
import { IMiddleware, IState } from '../data/interfaces'

import { EventEmitter } from './core.eventEmitter'

import { Viewport } from '.'

export class MiddlewareHandler {
    constructor(
        public middlewares: IMiddleware[] = [],
        public state: IState | undefined = undefined,
    ) { }

    public next(viewport: Viewport, eventEmitter: EventEmitter<OutputEventTypes>, state: IState): MiddlewareHandler {
        const { middlewares } = this

        const middleware = middlewares.at(0)

        if (middleware === undefined) return this

        const nextHandler = new MiddlewareHandler(middlewares.slice(1), state)

        if (middleware.shouldSkip(state)) return nextHandler.next(viewport, eventEmitter, state)

        const handled = middleware.handle(viewport, eventEmitter, state, nextHandler)

        middleware.save(state)

        return handled
    }
}
