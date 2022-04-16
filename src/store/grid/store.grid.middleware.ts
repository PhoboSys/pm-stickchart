import { MiddlewareHandler } from '../../core/core.middlewareHandler'
import { Viewport } from '../../core/core.viewport'
import { IMiddleware, IState } from '../../data/interfaces'

import { GridView } from './store.grid.view'

export class GridViewMiddleware implements IMiddleware<IState> {
    state: IState

    handle(viewport: Viewport, state: IState, handler: MiddlewareHandler<IState>): MiddlewareHandler<IState> {
        const view = new GridView(state, viewport)

        view.render()

        return handler.next(viewport, state)
    }

    shouldSkip(state: IState): boolean {
        return false
    }

    save(state: IState): void {
    }

}
