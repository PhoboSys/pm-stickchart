import { Viewport } from '../../core/core.viewport';
import { IState, IView } from '../../data/interfaces';
export declare class LinesView implements IView<IState> {
    readonly state: IState;
    readonly viewport: Viewport;
    static readonly renderKey: string;
    private readonly builded;
    constructor(state: IState, viewport: Viewport);
    render(): void;
    private buildLines;
    private createLine;
    private lineToPricePoint;
    private getPointByPricePoint;
    private getPointY;
    private getPointX;
}
