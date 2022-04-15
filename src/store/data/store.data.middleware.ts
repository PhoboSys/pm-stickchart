import { MiddlewareHandler } from '../../core/core.middlewareHandler'
import { Viewport } from '../../core/core.viewport'
import { ChartTypes } from '../../data/enums'
import { IMiddleware, IStickChartState } from '../../data/interfaces'

import { DataStateReducer } from './store.data.reducer'

export class DataMiddleware implements IMiddleware<IStickChartState> {
    handle(
        viewport: Viewport, state: IStickChartState, handler: MiddlewareHandler<IStickChartState>,
    ): MiddlewareHandler<IStickChartState> {
        const view = new DataStateReducer(state, viewport)

        view.render()

        return handler.next(viewport, state)
    }

    shouldSkip(state: IStickChartState): boolean {
        return false
    }

    save(state: IStickChartState): void {

    }
}
