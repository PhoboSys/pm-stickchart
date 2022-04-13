import { Viewport } from '../../core/core.viewport';
import { IStickChartState, IView } from '../../data/interfaces';
export declare class LinesView implements IView<IStickChartState> {
    readonly state: IStickChartState;
    readonly viewport: Viewport;
    static readonly renderKey: string;
    private readonly builded;
    constructor(state: IStickChartState, viewport: Viewport);
    render(): void;
    private buildLines;
    private moveByPricePoint;
    private getPricePointPoint;
    private getPointY;
    private getPointX;
}
