import { EventEmitter } from '../../core/core.eventEmitter'
import { MiddlewareHandler } from '../../core/core.middlewareHandler'
import { Viewport } from '../../core/core.viewport'
import { OutputEventTypes } from '../../data/enums/enum.outputEventTypes'
import { IMiddleware, IState } from '../../data/interfaces'

import { IntervalsStateReducer } from './store.intervls.reducer'

export class IntervalsHandlerMiddleware implements IMiddleware {
    public handle(
        viewport: Viewport, eventEmitter: EventEmitter<OutputEventTypes>, state: IState, handler: MiddlewareHandler,
    ): MiddlewareHandler {
        const reducer = new IntervalsStateReducer(state)

        reducer.reduceState()

        return handler.next(viewport, eventEmitter, state)
    }

    public shouldSkip(state: IState): boolean {
        return false
    }

    public save(state: IState): void {

    }
}
