import { Viewport, MiddlewareHandler } from '../../core'

import { IMiddleware, StickChartState } from '../../interfaces'

import { ZoomStateReducer } from './store.zoom.reducer'

export class ZoomHandleMiddleware implements IMiddleware<StickChartState> {
    lastState: StickChartState | undefined

    public handle(
        viewport: Viewport, state: StickChartState, handler: MiddlewareHandler<StickChartState>,
    ): MiddlewareHandler<StickChartState> {
        (<WheelEvent>state.emittedEvent)?.preventDefault()

        const reduce = new ZoomStateReducer(state)

        return handler.next(viewport, reduce.reduceState())
    }

    public skip(state: StickChartState): boolean {
        return !(state.emittedEvent instanceof WheelEvent)
    }
}
