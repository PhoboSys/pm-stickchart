import { Viewport, MiddlewareHandler } from '../../core'
import { InputEventTypes } from '../../data/enums'
import { IMiddleware, IState } from '../../data/interfaces'

import { ScrollEvent } from '../../utils/utils.scrollEvent'

import { ScrollStateReducer } from './store.scroll.reducer'

export class ScrollHandleMiddleware implements IMiddleware<IState> {
    private lastEvent?: ScrollEvent

    public handle(
        viewport: Viewport, state: IState, handler: MiddlewareHandler<IState>,
    ): MiddlewareHandler<IState> {
        const reduce = new ScrollStateReducer(state, this.lastEvent)

        reduce.reduceState()

        return handler.next(viewport, state)
    }

    public shouldSkip(state: IState): boolean {
        return state.inputEvent?.type !== InputEventTypes.scroll
    }

    public save(state: IState): void {
        this.lastEvent = { ...<ScrollEvent>state.inputEvent?.event }
    }
}
