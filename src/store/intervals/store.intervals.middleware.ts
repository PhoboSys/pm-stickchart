import { MiddlewareHandler } from '../../core/core.middlewareHandler'
import { Viewport } from '../../core/core.viewport'
import { IMiddleware, IStickChartState } from '../../data/interfaces'

import { IntervalsStateReducer } from './store.intervls.reducer'

export class IntervalsHandlerMiddleware implements IMiddleware<IStickChartState> {
    public handle(
        viewport: Viewport, state: IStickChartState, handler: MiddlewareHandler<IStickChartState>,
    ): MiddlewareHandler<IStickChartState> {
        const reducer = new IntervalsStateReducer(state)

        reducer.reduceState()

        return handler.next(viewport, state)
    }

    public shouldSkip(state: IStickChartState): boolean {
        return false
    }

    public save(state: IStickChartState): void {

    }
}
