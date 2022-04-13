import { Viewport, MiddlewareHandler } from '../../core';
import { IMiddleware, IStickChartState } from '../../data/interfaces';
export declare class ScrollHandleMiddleware implements IMiddleware<IStickChartState> {
    private lastEvent;
    handle(viewport: Viewport, state: IStickChartState, handler: MiddlewareHandler<IStickChartState>): MiddlewareHandler<IStickChartState>;
    shouldSkip(state: IStickChartState): boolean;
    save(state: IStickChartState): void;
}
