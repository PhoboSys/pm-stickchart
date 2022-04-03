import { Graphics } from '@pixi/graphics';
import { Duration } from 'moment';
import { DateRange, ValueRange } from '..';
import { IMiddleware, IRenderStickChart } from '../interfaces';
import { MiddlewareHandler } from './Handler';
export declare class GridBuilderMiddleware implements IMiddleware<IRenderStickChart>, IRenderStickChart {
    viewport: Graphics;
    width: number;
    height: number;
    dateRange: DateRange;
    renderDateRange: DateRange;
    columnIntervalSize: Duration;
    stickIntervalWidth: Duration;
    valueRange: ValueRange;
    rowIntervalSize: number;
    handle(options: IRenderStickChart, handler: MiddlewareHandler<IRenderStickChart>): MiddlewareHandler<IRenderStickChart>;
    private get beginColumnWhitespace();
    private get columnWhitespace();
    private get rowWhitespace();
    private get columnsCount();
    private get rowsCount();
    build(): void;
    private buildVerticalLines;
    private buildHorizontalLines;
}
