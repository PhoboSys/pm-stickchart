import { IReducer, IState } from '../../data/interfaces';
export declare class DataStateReducer implements IReducer<IState> {
    readonly state: IState;
    constructor(state: IState);
    reduceState(): IState;
    private setDataPriceRange;
    private get dataPriceRange();
    private get prices();
    private get priceMapper();
}
