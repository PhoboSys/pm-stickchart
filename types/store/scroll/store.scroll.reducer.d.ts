import { IReducer, StickChartState } from '../../interfaces';
import { ScrollEvent } from '../../utils/utils.scrollEvent';
export declare class ScrollStateReducer implements IReducer<StickChartState> {
    readonly state: StickChartState;
    private readonly previousEvent;
    constructor(state: StickChartState, previousEvent: ScrollEvent | null);
    reduceState(): StickChartState;
    private moveRenderDateRange;
    private get xShift();
}
