import { Graphics } from '@pixi/graphics';
import { IBuilder, IStick } from '../interfaces';
import { ValueRange } from '../utils';
import { DateRange } from '../utils/DateRange';
export declare class CandleStickBuilder extends Graphics implements IBuilder {
    private stick;
    private screenWidth;
    private screenHeight;
    private stickWidth;
    private renderValueRange;
    private renderDateRange;
    constructor(stick: IStick, screenWidth: number, screenHeight: number, stickWidth: number, renderValueRange: ValueRange, renderDateRange: DateRange);
    private get color();
    private get rectHeight();
    private get centerX();
    private get rectTopY();
    build(): Graphics;
    private buildLine;
    private buildRectangle;
    private getPointY;
    private getPointX;
}
