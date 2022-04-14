import { MiddlewareHandler } from '../../core/core.middlewareHandler'
import { Viewport } from '../../core/core.viewport'
import { ChartTypes } from '../../data/enums'
import { IMiddleware, IStickChartState } from '../../data/interfaces'

import { CandleStickView } from './store.candlestick.view'

export class CandleStickMiddleware implements IMiddleware<IStickChartState> {
    handle(
        viewport: Viewport, state: IStickChartState, handler: MiddlewareHandler<IStickChartState>,
    ): MiddlewareHandler<IStickChartState> {
        const view = new CandleStickView(state, viewport)

        view.render()

        return handler.next(viewport, state)
    }

    shouldSkip(state: IStickChartState): boolean {
        const { chartType, dataManager } = state

        return dataManager.data.length < 1 || chartType !== ChartTypes.candleSticks
    }

    save(state: IStickChartState): void {

    }
}
