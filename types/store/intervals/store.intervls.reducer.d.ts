import { IReducer, IState } from '../../data/interfaces';
export declare class IntervalsStateReducer implements IReducer<IState> {
    readonly state: IState;
    constructor(state: IState);
    reduceState(): IState;
    private setPriceRange;
    private roundRowIntervalSize;
    private roundColumnIntervalSize;
}
