import { Viewport, MiddlewareHandler } from '../../core'

import { EventEmitter } from '../../core/core.eventEmitter'
import { InputEventTypes } from '../../data/enums'
import { OutputEventTypes } from '../../data/enums/enum.outputEventTypes'
import { IMiddleware, IState } from '../../data/interfaces'

import { ZoomStateReducer } from './store.zoom.reducer'

export class ZoomHandleMiddleware implements IMiddleware {
    public handle(
        viewport: Viewport, eventEmitter: EventEmitter<OutputEventTypes>, state: IState, handler: MiddlewareHandler,
    ): MiddlewareHandler {
        const reducer = new ZoomStateReducer(state)

        reducer.reduceState()

        return handler.next(viewport, eventEmitter, state)
    }

    public shouldSkip(state: IState): boolean {
        return state.inputEvent?.type !== InputEventTypes.zoom
    }

    public save(state: IState): void {

    }
}
