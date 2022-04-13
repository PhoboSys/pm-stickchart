import { Viewport } from '../../core/core.viewport';
import { IStickChartState, IView } from '../../data/interfaces';
export declare class GridView implements IView<IStickChartState> {
    readonly state: IStickChartState;
    readonly viewport: Viewport;
    static readonly renderKey: string;
    private readonly buildedGrid;
    constructor(state: IStickChartState, viewport: Viewport);
    render(): void;
    private get beginColumnWhitespace();
    private get columnWhitespace();
    private get rowWhitespace();
    private get columnsCount();
    private get rowsCount();
    private build;
    private buildVerticalLines;
    private buildHorizontalLines;
    private buildLine;
}
