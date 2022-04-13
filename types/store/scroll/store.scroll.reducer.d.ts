import { IReducer, IStickChartState } from '../../data/interfaces';
import { ScrollEvent } from '../../utils/utils.scrollEvent';
export declare class ScrollStateReducer implements IReducer<IStickChartState> {
    readonly state: IStickChartState;
    private readonly previousEvent;
    constructor(state: IStickChartState, previousEvent: ScrollEvent | null);
    reduceState(): IStickChartState;
    private moveRenderDateRange;
    private get xShift();
}
