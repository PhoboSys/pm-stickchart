import { IReducer, IState } from '../../data/interfaces';
import { ScrollEvent } from '../../utils/utils.scrollEvent';
export declare class ScrollStateReducer implements IReducer<IState> {
    readonly state: IState;
    private readonly previousEvent?;
    constructor(state: IState, previousEvent?: ScrollEvent | undefined);
    reduceState(): IState;
    private moveRenderDateRange;
    private get xShift();
}
