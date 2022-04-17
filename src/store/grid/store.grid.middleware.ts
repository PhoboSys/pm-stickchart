import { EventEmitter } from '../../core/core.eventEmitter'
import { MiddlewareHandler } from '../../core/core.middlewareHandler'
import { Viewport } from '../../core/core.viewport'
import { OutputEventTypes } from '../../data/enums/enum.outputEventTypes'
import { IMiddleware, IState } from '../../data/interfaces'

import { GridView } from './store.grid.view'

export class GridViewMiddleware implements IMiddleware {
    state: IState

    handle(viewport: Viewport, eventEmitter: EventEmitter<OutputEventTypes>, state: IState, handler: MiddlewareHandler): MiddlewareHandler {
        const view = new GridView(state, viewport)

        view.render()

        return handler.next(viewport, eventEmitter, state)
    }

    shouldSkip(state: IState): boolean {
        return false
    }

    save(state: IState): void {
    }

}
