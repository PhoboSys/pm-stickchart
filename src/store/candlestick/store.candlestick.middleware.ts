import { MiddlewareHandler } from '../../core/core.middlewareHandler'
import { Viewport } from '../../core/core.viewport'
import { IMiddleware, StickChartState } from '../../interfaces'

import { CandleStickView } from './store.candlestick.view'

export class CandleStickMiddleware implements IMiddleware<StickChartState> {
    lastState: StickChartState | undefined

    state: StickChartState

    handle(viewport: Viewport, state: StickChartState, handler: MiddlewareHandler<StickChartState>): MiddlewareHandler<StickChartState> {
        const view = new CandleStickView(state, viewport)

        view.render()

        return handler.next(viewport, state)
    }

    skip(state: StickChartState): boolean {
        return state.renderSticks.length < 1
    }
}
