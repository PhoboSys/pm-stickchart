import { Viewport } from '../../core';
import { IView, IStickChartState } from '../../data/interfaces';
export declare class CandleStickView implements IView<IStickChartState> {
    readonly state: IStickChartState;
    readonly viewport: Viewport;
    static readonly renderKey: string;
    private readonly builded;
    constructor(state: IStickChartState, viewport: Viewport);
    private get stickWidth();
    render(): void;
    private buildSticks;
}
