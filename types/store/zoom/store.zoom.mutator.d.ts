import { IMutator, StickChartState } from '../../interfaces';
export declare class ZoomStateMutator implements IMutator<StickChartState> {
    readonly state: StickChartState;
    constructor(state: StickChartState);
    mutateState(): StickChartState;
    private moveRenderDateRange;
}
