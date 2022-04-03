import { Graphics } from '@pixi/graphics';
import { IRenderCandleStick } from '@interfaces/candleStick';
export declare class CandleStick extends Graphics {
    private readonly low;
    private readonly high;
    private readonly open;
    private readonly close;
    private readonly date;
    private screenWidth;
    private screenHeight;
    private readonly renderDateRange;
    private readonly stickIntervalWidth;
    private readonly valueRange;
    set width(width: any);
    set height(height: any);
    constructor(init: IRenderCandleStick);
    private get color();
    private get rectWidth();
    private get rectHeight();
    private get centerX();
    private get rectTopY();
    build(): CandleStick;
    private buildLine;
    private buildRectangle;
    private getPointY;
    private getPointX;
}
