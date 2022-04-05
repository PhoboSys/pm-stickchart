import { Viewport } from '../../core/core.viewport';
import { StickChartState, IView } from '../../interfaces';
export declare class GridView implements IView<StickChartState> {
    readonly state: StickChartState;
    readonly viewport: Viewport;
    static readonly renderKey: string;
    private readonly buildedGrid;
    constructor(state: StickChartState, viewport: Viewport);
    render(): void;
    private get beginColumnWhitespace();
    private get columnWhitespace();
    private get rowWhitespace();
    private get columnsCount();
    private get rowsCount();
    private build;
    private buildVerticalLines;
    private buildHorizontalLines;
}
