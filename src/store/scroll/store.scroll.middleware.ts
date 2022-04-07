import { Viewport, MiddlewareHandler } from '../../core'
import { IMiddleware, StickChartState } from '../../interfaces'

import { HandledEvent } from '../../utils/utils.handledEvent'
import { ScrollEvent } from '../../utils/utils.scrollEvent'

import { ScrollStateReducer } from './store.scroll.reducer'

export class ScrollHandleMiddleware implements IMiddleware<StickChartState> {
    private lastEvent: ScrollEvent | null = null

    public handle(
        viewport: Viewport, state: StickChartState, handler: MiddlewareHandler<StickChartState>,
    ): MiddlewareHandler<StickChartState> {
        const reduce = new ScrollStateReducer(state, this.lastEvent)

        reduce.reduceState()

        this.cloneEvent(state)

        state.emittedEvent = new HandledEvent()

        return handler.next(viewport, state)
    }

    public skip(state: StickChartState): boolean {
        return !(state.emittedEvent instanceof ScrollEvent)
    }

    private cloneEvent(state: StickChartState): void {
        this.lastEvent = { ...<ScrollEvent>state.emittedEvent }
    }
}
