import { Viewport, MiddlewareHandler } from '../../core'
import { InputEventTypes } from '../../data/enums'
import { IMiddleware, IStickChartState } from '../../data/interfaces'

import { ScrollEvent } from '../../utils/utils.scrollEvent'

import { ScrollStateReducer } from './store.scroll.reducer'

export class ScrollHandleMiddleware implements IMiddleware<IStickChartState> {
    private lastEvent: ScrollEvent | null = null

    public handle(
        viewport: Viewport, state: IStickChartState, handler: MiddlewareHandler<IStickChartState>,
    ): MiddlewareHandler<IStickChartState> {
        const reduce = new ScrollStateReducer(state, this.lastEvent)

        reduce.reduceState()

        return handler.next(viewport, state)
    }

    public shouldSkip(state: IStickChartState): boolean {
        return state.inputEvent?.type !== InputEventTypes.scroll
    }

    public save(state: IStickChartState): void {
        this.lastEvent = { ...<ScrollEvent>state.inputEvent?.event }
    }
}
