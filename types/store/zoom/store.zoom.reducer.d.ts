import { IReducer, StickChartState } from '../../interfaces';
export declare class ZoomStateReducer implements IReducer<StickChartState> {
    readonly state: StickChartState;
    constructor(state: StickChartState);
    reduceState(): StickChartState;
    private moveRenderDateRange;
}
