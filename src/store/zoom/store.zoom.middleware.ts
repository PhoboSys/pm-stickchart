import { Viewport, MiddlewareHandler } from '../../core'

import { IMiddleware, StickChartState } from '../../interfaces'

import { ZoomStateMutator } from './store.zoom.mutator'

export class ZoomHandleMiddleware implements IMiddleware<StickChartState> {
    lastState: StickChartState | undefined

    handle(viewport: Viewport, state: StickChartState, handler: MiddlewareHandler<StickChartState>): MiddlewareHandler<StickChartState> {
        state.zoomEvent?.preventDefault()

        const mutator = new ZoomStateMutator(state)

        return handler.next(viewport, mutator.mutateState())
    }

    skip(state: StickChartState): boolean {
        return state.zoomEvent === undefined
    }
}
