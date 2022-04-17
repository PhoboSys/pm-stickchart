import { IReducer, IState } from '../../data/interfaces';
export declare class GridStateReducer implements IReducer<IState> {
    readonly state: IState;
    private beginColumnWhitespace;
    private columnWhitespace;
    private rowWhitespace;
    private columnsCount;
    private rowsCount;
    constructor(state: IState);
    private get realHeight();
    private getBeginColumnWhitespace;
    private getColumnWhitespace;
    private getRowWhitespace;
    private getColumnsCount;
    private getRowsCount;
    reduceState(): IState;
}
