import { Viewport, MiddlewareHandler } from '../../core'
import { EventEmitter } from '../../core/core.eventEmitter'
import { InputEventTypes } from '../../data/enums'
import { OutputEventTypes } from '../../data/enums/enum.outputEventTypes'
import { IMiddleware, IState } from '../../data/interfaces'

import { ScrollEvent } from '../../utils/utils.scrollEvent'

import { ScrollStateReducer } from './store.scroll.reducer'

export class ScrollHandleMiddleware implements IMiddleware {
    private lastEvent?: ScrollEvent

    public handle(
        viewport: Viewport, eventEmitter: EventEmitter<OutputEventTypes>, state: IState, handler: MiddlewareHandler,
    ): MiddlewareHandler {
        const reduce = new ScrollStateReducer(state, this.lastEvent)

        reduce.reduceState()

        eventEmitter.emit(OutputEventTypes.scroll, 'scrollEvent')

        return handler.next(viewport, eventEmitter, state)
    }

    public shouldSkip(state: IState): boolean {
        return state.inputEvent?.type !== InputEventTypes.scroll
    }

    public save(state: IState): void {
        this.lastEvent = { ...<ScrollEvent>state.inputEvent?.event }
    }
}
