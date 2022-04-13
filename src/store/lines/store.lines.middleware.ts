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
        return (state.renderConfig.dataManager?.data?.length ?? 0) < 1 || state.viewConfig.chartType !== ChartTypes.lines
    }

    save(state: IStickChartState): void {

    }
}
