import { IReducer, IStickChartState } from '../../data/interfaces';
export declare class ZoomStateReducer implements IReducer<IStickChartState> {
    readonly state: IStickChartState;
    constructor(state: IStickChartState);
    reduceState(): IStickChartState;
    private moveRenderDateRange;
    private roundColumnIntervalSize;
}
