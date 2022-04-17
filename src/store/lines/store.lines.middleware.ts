import { EventEmitter } from '../../core/core.eventEmitter'
import { MiddlewareHandler } from '../../core/core.middlewareHandler'
import { Viewport } from '../../core/core.viewport'
import { ChartTypes } from '../../data/enums'
import { OutputEventTypes } from '../../data/enums/enum.outputEventTypes'
import { IMiddleware, IState } from '../../data/interfaces'

import { LinesView } from './store.lines.view'

export class LinesViewMiddleware implements IMiddleware {
    handle(
        viewport: Viewport, eventEmitter: EventEmitter<OutputEventTypes>, state: IState, handler: MiddlewareHandler,
    ): MiddlewareHandler {
        const view = new LinesView(state, viewport)

        view.render()

        return handler.next(viewport, eventEmitter, state)
    }

    shouldSkip(state: IState): boolean {
        const { chartType, dataManager } = state

        return dataManager.length === 0 || chartType !== ChartTypes.lines
    }

    save(state: IState): void {

    }
}
