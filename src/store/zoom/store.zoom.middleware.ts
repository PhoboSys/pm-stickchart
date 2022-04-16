import { Viewport, MiddlewareHandler } from '../../core'

import { InputEventTypes } from '../../data/enums'
import { IMiddleware, IState } from '../../data/interfaces'

import { ZoomStateReducer } from './store.zoom.reducer'

export class ZoomHandleMiddleware implements IMiddleware<IState> {
    public handle(
        viewport: Viewport, state: IState, handler: MiddlewareHandler<IState>,
    ): MiddlewareHandler<IState> {
        const reducer = new ZoomStateReducer(state)

        reducer.reduceState()

        return handler.next(viewport, state)
    }

    public shouldSkip(state: IState): boolean {
        return state.inputEvent?.type !== InputEventTypes.zoom
    }

    public save(state: IState): void {

    }
}
