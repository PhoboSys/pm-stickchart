import { IReducer, IStickChartState } from '../../data/interfaces';
export declare class IntervalsStateReducer implements IReducer<IStickChartState> {
    readonly state: IStickChartState;
    constructor(state: IStickChartState);
    reduceState(): IStickChartState;
    private setPriceRange;
    private roundRowIntervalSize;
    private roundColumnIntervalSize;
}
