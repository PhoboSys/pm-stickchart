import { Viewport } from '../../core/core.viewport';
import { StickChartState } from '../../interfaces/interface.stickChart';
import { IView } from '../../interfaces/interface.view';
export declare class GridView implements IView<StickChartState> {
    readonly state: StickChartState;
    readonly viewport: Viewport;
    private readonly renderKey;
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
