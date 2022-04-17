import { EventEmitter } from '../../core/core.eventEmitter'
import { MiddlewareHandler } from '../../core/core.middlewareHandler'
import { Viewport } from '../../core/core.viewport'
import { ChartTypes } from '../../data/enums'
import { OutputEventTypes } from '../../data/enums/enum.outputEventTypes'
import { IMiddleware, IState } from '../../data/interfaces'

import { CandleStickView } from './store.candlestick.view'

export class CandleStickViewMiddleware implements IMiddleware {
    handle(
        viewport: Viewport, eventEmitter: EventEmitter<OutputEventTypes>, state: IState, handler: MiddlewareHandler,
    ): MiddlewareHandler {
        const view = new CandleStickView(state, viewport)

        view.render()

        return handler.next(viewport, eventEmitter, state)
    }

    shouldSkip(state: IState): boolean {
        const { chartType, dataManager } = state

        return dataManager.data.length < 1 || chartType !== ChartTypes.candleSticks
    }

    save(state: IState): void {

    }
}
