import { Viewport } from '../../core/core.viewport';
import { IState, IView } from '../../data/interfaces';
export declare class GridView implements IView<IState> {
    readonly state: IState;
    readonly viewport: Viewport;
    static readonly renderKey: string;
    private readonly buildedGrid;
    private beginColumnWhitespace;
    private columnWhitespace;
    private rowWhitespace;
    private columnsCount;
    private rowsCount;
    constructor(state: IState, viewport: Viewport);
    private get realHeight();
    private getBeginColumnWhitespace;
    private getColumnWhitespace;
    private getRowWhitespace;
    private getColumnsCount;
    private getRowsCount;
    render(): void;
    private build;
    private buildVerticalLines;
    private buildHorizontalLines;
    private buildLine;
    private buildPriceMarks;
    private buildDateMarks;
}
