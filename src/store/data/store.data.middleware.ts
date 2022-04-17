import { MiddlewareHandler } from '../../core/core.middlewareHandler'
import { Viewport } from '../../core/core.viewport'
import { OutputEventTypes } from '../../data/enums/enum.outputEventTypes'
import { IMiddleware, IState } from '../../data/interfaces'

import { DataStateReducer } from './store.data.reducer'

import { EventEmitter } from '@src/core'

export class DataMiddleware implements IMiddleware {
    handle(
        viewport: Viewport, eventEmitter: EventEmitter<OutputEventTypes>, state: IState, handler: MiddlewareHandler,
    ): MiddlewareHandler {
        const reducer = new DataStateReducer(state)

        reducer.reduceState()

        return handler.next(viewport, eventEmitter, state)
    }

    shouldSkip(state: IState): boolean {
        return state.dataManager.isEmpty
    }

    save(state: IState): void {

    }
}
