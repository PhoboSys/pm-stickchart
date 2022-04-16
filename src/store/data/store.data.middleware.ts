import { MiddlewareHandler } from '../../core/core.middlewareHandler'
import { Viewport } from '../../core/core.viewport'
import { IMiddleware, IState } from '../../data/interfaces'

import { DataStateReducer } from './store.data.reducer'

export class DataMiddleware implements IMiddleware<IState> {
    handle(
        viewport: Viewport, state: IState, handler: MiddlewareHandler<IState>,
    ): MiddlewareHandler<IState> {
        const reducer = new DataStateReducer(state)

        reducer.reduceState()

        return handler.next(viewport, state)
    }

    shouldSkip(state: IState): boolean {
        return state.dataManager.isEmpty
    }

    save(state: IState): void {

    }
}
