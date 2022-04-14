import { MiddlewareHandler } from '../../core/core.middlewareHandler'
import { Viewport } from '../../core/core.viewport'
import { ChartTypes } from '../../data/enums'
import { IMiddleware, IStickChartState } from '../../data/interfaces'

import { LinesView } from './store.lines.view'

export class LinesViewMiddleware implements IMiddleware<IStickChartState> {
    handle(
        viewport: Viewport, state: IStickChartState, handler: MiddlewareHandler<IStickChartState>,
    ): MiddlewareHandler<IStickChartState> {
        const view = new LinesView(state, viewport)

        view.render()

        return handler.next(viewport, state)
    }

    shouldSkip(state: IStickChartState): boolean {
        const { chartType, dataManager } = state

        return dataManager.data.length < 1 || chartType !== ChartTypes.lines
    }

    save(state: IStickChartState): void {

    }
}
