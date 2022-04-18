import { Viewport, MiddlewareHandler } from '../../core'

import { InputEventTypes } from '../../data/enums'
import { IMiddleware, IStickChartState } from '../../data/interfaces'

import { ZoomStateReducer } from './store.zoom.reducer'

export class ZoomHandleMiddleware implements IMiddleware<IStickChartState> {
    public handle(
        viewport: Viewport, state: IStickChartState, handler: MiddlewareHandler<IStickChartState>,
    ): MiddlewareHandler<IStickChartState> {
        const reducer = new ZoomStateReducer(state)

        reducer.reduceState()

        return handler.next(viewport, state)
    }

    public shouldSkip(state: IStickChartState): boolean {
        return state.inputEvent.type !== InputEventTypes.zoom
    }

    public save(state: IStickChartState): void {

    }
}
