import { MiddlewareHandler } from '../../core/core.middlewareHandler'
import { Viewport } from '../../core/core.viewport'
import { IMiddleware, IState } from '../../data/interfaces'

import { IntervalsStateReducer } from './store.intervls.reducer'

export class IntervalsHandlerMiddleware implements IMiddleware<IState> {
    public handle(
        viewport: Viewport, state: IState, handler: MiddlewareHandler<IState>,
    ): MiddlewareHandler<IState> {
        const reducer = new IntervalsStateReducer(state)

        reducer.reduceState()

        return handler.next(viewport, state)
    }

    public shouldSkip(state: IState): boolean {
        return false
    }

    public save(state: IState): void {

    }
}
