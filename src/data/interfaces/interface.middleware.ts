import { MiddlewareHandler, EventEmitter, Viewport } from '../../core'

import { OutputEventTypes } from '../enums/enum.outputEventTypes'

import { IState } from '.'

export interface IMiddleware {
    handle(
        viewport: Viewport,
        eventEmitter: EventEmitter<OutputEventTypes>,
        state: IState,
        handler: MiddlewareHandler
    ): MiddlewareHandler

    shouldSkip(state: IState): boolean

    save(state: IState): void
}

