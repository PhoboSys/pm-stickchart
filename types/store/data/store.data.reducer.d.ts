import { IReducer, IStickChartState } from '../../data/interfaces';
export declare class DataStateReducer implements IReducer<IStickChartState> {
    readonly state: IStickChartState;
    constructor(state: IStickChartState);
    reduceState(): IStickChartState;
    private setDataPriceRange;
    private get dataPriceRange();
    private get prices();
    private get priceMapper();
}
