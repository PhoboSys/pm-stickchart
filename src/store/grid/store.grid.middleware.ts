import { MiddlewareHandler } from '../../core/core.middlewareHandler'
import { Viewport } from '../../core/core.viewport'
import { IMiddleware, StickChartState } from '../../interfaces'

import { GridView } from './store.grid.view'

export class GridViewMiddleware implements IMiddleware<StickChartState> {
    lastState: StickChartState | undefined

    state: StickChartState

    handle(viewport: Viewport, state: StickChartState, handler: MiddlewareHandler<StickChartState>): MiddlewareHandler<StickChartState> {
        const view = new GridView(state, viewport)

        view.render()

        return handler.next(viewport, state)
    }

    skip(state: StickChartState): boolean {
        return false
    }
}
