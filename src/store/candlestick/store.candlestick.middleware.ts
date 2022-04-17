import { MiddlewareHandler } from '../../core/core.middlewareHandler'
import { Viewport } from '../../core/core.viewport'
import { ChartTypes } from '../../data/enums'
import { IMiddleware, IState } from '../../data/interfaces'

import { CandleStickView } from './store.candlestick.view'

export class CandleStickViewMiddleware implements IMiddleware<IState> {
    handle(
        viewport: Viewport, state: IState, handler: MiddlewareHandler<IState>,
    ): MiddlewareHandler<IState> {
        const view = new CandleStickView(state, viewport)

        view.render()

        return handler.next(viewport, state)
    }

    shouldSkip(state: IState): boolean {
        const { chartType, dataManager } = state

        return dataManager.data.length < 1 || chartType !== ChartTypes.candleSticks
    }

    save(state: IState): void {

    }
}
