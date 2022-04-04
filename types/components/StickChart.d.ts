import { Container } from '@pixi/display';
import { Graphics } from '@pixi/graphics';
import { Duration } from 'moment';
import { ICandleStick, IStickChart } from '../interfaces';
import { DateRange, ValueRange } from '../utils';
export declare class StickChart {
    protected width: number;
    protected height: number;
    protected dateRange: DateRange;
    protected renderDateRange: DateRange;
    protected columnIntervalSize: Duration;
    protected stickIntervalWidth: Duration;
    protected valueRange: ValueRange;
    protected rowIntervalSize: number;
    protected buildedSticks: Graphics;
    protected buildedGrid: Graphics;
    protected readonly buildedChart: Graphics;
    protected readonly candleSticks: Array<ICandleStick>;
    constructor(init: IStickChart);
    viewport(container: Container): void;
    zoomEventHandler(event: WheelEvent): void;
    cacheBuild(): Graphics;
    private buildGrid;
    private buildSticks;
    clear(): void;
    rebuild(): Graphics;
    addCandleStick(candleStick: ICandleStick): void;
}
