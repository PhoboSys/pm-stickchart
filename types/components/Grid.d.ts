import { Graphics } from '@pixi/graphics';
import { Duration } from 'moment';
import { IRenderGrid } from '../interfaces/';
import { ValueRange, DateRange } from '../utils/';
export declare class Grid extends Graphics {
    protected readonly screenWidth: number;
    protected readonly screenHeight: number;
    protected readonly dateRange: DateRange;
    protected readonly renderDateRange: DateRange;
    protected readonly columnIntervalSize: Duration;
    protected readonly valueRange: ValueRange;
    protected readonly rowIntervalSize: number;
    constructor({ width, height, dateRange, renderDateRange, columnIntervalSize, valueRange, rowIntervalSize }: IRenderGrid);
    private get beginColumnWhitespace();
    private get columnWhitespace();
    private get rowWhitespace();
    private get columnsCount();
    private get rowsCount();
    build(): Grid;
    private buildVerticalLines;
    private buildHorizontalLines;
}
