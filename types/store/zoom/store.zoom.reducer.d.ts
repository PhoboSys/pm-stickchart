import { IReducer, IState } from '../../data/interfaces';
export declare class ZoomStateReducer implements IReducer<IState> {
    readonly state: IState;
    constructor(state: IState);
    reduceState(): IState;
    private moveRenderDateRange;
}
