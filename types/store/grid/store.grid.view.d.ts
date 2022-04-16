import { Viewport } from '../../core/core.viewport';
import { IState, IView } from '../../data/interfaces';
export declare class GridView implements IView<IState> {
    readonly state: IState;
    readonly viewport: Viewport;
    static readonly renderKey: string;
    private readonly buildedGrid;
    constructor(state: IState, viewport: Viewport);
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
