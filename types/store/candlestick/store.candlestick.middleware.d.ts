import { MiddlewareHandler } from '../../core/core.middlewareHandler';
import { Viewport } from '../../core/core.viewport';
import { IMiddleware, StickChartState } from '../../interfaces';
export declare class CandleStickMiddleware implements IMiddleware<StickChartState> {
    lastState: StickChartState | undefined;
    state: StickChartState;
    handle(viewport: Viewport, state: StickChartState, handler: MiddlewareHandler<StickChartState>): MiddlewareHandler<StickChartState>;
    skip(state: StickChartState): boolean;
}
