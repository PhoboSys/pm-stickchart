import { IReducer, StickChartState } from '../../interfaces';
export declare class MouseStateReducer implements IReducer<StickChartState> {
    readonly state: StickChartState;
    constructor(state: StickChartState);
    reduceState(): StickChartState;
    private setMouseDownFlag;
}
