import { Graphics } from '@pixi/graphics';
import { IBuilder, IStick, IStickChartStyle } from '../data/interfaces';
import { PriceRange, DateRange } from '../utils';
export declare class CandleStickBuilder extends Graphics implements IBuilder {
    private stick;
    private style;
    private screenWidth;
    private screenHeight;
    private stickWidth;
    private valueRange;
    private dateRange;
    constructor(stick: IStick, style: IStickChartStyle, screenWidth: number, screenHeight: number, stickWidth: number, valueRange: PriceRange, dateRange: DateRange);
    private get color();
    private get centerX();
    private get rectTopY();
    private get rectBottomY();
    build(): Graphics;
    private buildLine;
    private buildRectangle;
    private getPointY;
    private getPointX;
}
