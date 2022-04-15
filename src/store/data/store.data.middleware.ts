import { MiddlewareHandler } from '../../core/core.middlewareHandler'
import { Viewport } from '../../core/core.viewport'
import { IMiddleware, IStickChartState } from '../../data/interfaces'

import { DataStateReducer } from './store.data.reducer'

export class DataMiddleware implements IMiddleware<IStickChartState> {
    handle(
        viewport: Viewport, state: IStickChartState, handler: MiddlewareHandler<IStickChartState>,
    ): MiddlewareHandler<IStickChartState> {
        const reducer = new DataStateReducer(state)

        reducer.reduceState()

        return handler.next(viewport, state)
    }

    shouldSkip(state: IStickChartState): boolean {
        return state.dataManager.isEmpty
    }

    save(state: IStickChartState): void {

    }
}
