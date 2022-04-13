import { MiddlewareHandler } from '../../core/core.middlewareHandler';
import { Viewport } from '../../core/core.viewport';
import { IMiddleware, IStickChartState } from '../../data/interfaces';
export declare class IntervalsHandlerMiddleware implements IMiddleware<IStickChartState> {
    handle(viewport: Viewport, state: IStickChartState, handler: MiddlewareHandler<IStickChartState>): MiddlewareHandler<IStickChartState>;
    shouldSkip(state: IStickChartState): boolean;
    save(state: IStickChartState): void;
}
