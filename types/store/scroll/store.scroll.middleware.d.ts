import { Viewport, MiddlewareHandler } from '../../core';
import { IMiddleware, StickChartState } from '../../interfaces';
export declare class ScrollHandleMiddleware implements IMiddleware<StickChartState> {
    private lastEvent;
    handle(viewport: Viewport, state: StickChartState, handler: MiddlewareHandler<StickChartState>): MiddlewareHandler<StickChartState>;
    skip(state: StickChartState): boolean;
    private cloneEvent;
}
