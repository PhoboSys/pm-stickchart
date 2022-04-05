import { Viewport } from '../../core/core.viewport';
import { StickChartState, IView } from '../../interfaces';
export declare class CandleStickView implements IView<StickChartState> {
    readonly state: StickChartState;
    readonly viewport: Viewport;
    static readonly renderKey: string;
    private readonly builded;
    constructor(state: StickChartState, viewport: Viewport);
    private get stickWidth();
    render(): void;
    private buildSticks;
}
