import { Viewport, MiddlewareHandler } from '../../core';
import { IMiddleware, StickChartState } from '../../interfaces';
export declare class MouseEventHandleMiddleware implements IMiddleware<StickChartState> {
    lastState: StickChartState | undefined;
    handle(viewport: Viewport, state: StickChartState, handler: MiddlewareHandler<StickChartState>): MiddlewareHandler<StickChartState>;
    skip(state: StickChartState): boolean;
}
