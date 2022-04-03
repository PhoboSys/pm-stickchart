import { Graphics } from '@pixi/graphics';
import { Duration } from 'moment';
import { IStickChart } from '../interfaces';
import { IRenderStickChart } from '../interfaces/stickChart';
import { MiddlewareHandler } from '../middlewares/Handler';
import { DateRange, ValueRange } from '../utils';
export declare class StickChart implements IStickChart {
    width: number;
    height: number;
    dateRange: DateRange;
    renderDateRange: DateRange;
    columnIntervalSize: Duration;
    stickIntervalWidth: Duration;
    valueRange: ValueRange;
    rowIntervalSize: number;
    middlewareHandler: MiddlewareHandler<IRenderStickChart>;
    constructor(init: IStickChart);
    build(viewport: Graphics): void;
}
