import { MiddlewareHandler } from '../../core/core.middlewareHandler'
import { Viewport } from '../../core/core.viewport'
import { IMiddleware, IStickChartState } from '../../data/interfaces'

import { GridView } from './store.grid.view'

export class GridViewMiddleware implements IMiddleware<IStickChartState> {
    state: IStickChartState

    handle(
        viewport: Viewport,
        state: IStickChartState,
        handler: MiddlewareHandler<IStickChartState>
    ): MiddlewareHandler<IStickChartState> {

        const view = new GridView(state, viewport)

        view.render()

        return handler.next(viewport, state)
    }

    shouldSkip(state: IStickChartState): boolean {
        return false
    }

    save(state: IStickChartState): void {
    }

}
