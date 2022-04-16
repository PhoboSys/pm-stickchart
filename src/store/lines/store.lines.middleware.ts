import { MiddlewareHandler } from '../../core/core.middlewareHandler'
import { Viewport } from '../../core/core.viewport'
import { ChartTypes } from '../../data/enums'
import { IMiddleware, IState } from '../../data/interfaces'

import { LinesView } from './store.lines.view'

export class LinesViewMiddleware implements IMiddleware<IState> {
    handle(
        viewport: Viewport, state: IState, handler: MiddlewareHandler<IState>,
    ): MiddlewareHandler<IState> {
        const view = new LinesView(state, viewport)

        view.render()

        return handler.next(viewport, state)
    }

    shouldSkip(state: IState): boolean {
        const { chartType, dataManager } = state

        return dataManager.data.length < 1 || chartType !== ChartTypes.lines
    }

    save(state: IState): void {

    }
}
