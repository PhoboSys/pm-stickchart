import { Container } from '@pixi/display';
import { Duration } from 'moment';
import { DateRange, ValueRange } from '../utils';
export declare class StickChart {
    private width;
    private height;
    private dateRange;
    private renderDateRange;
    private columnIntervalSize;
    private stickIntervalWidth;
    private valueRange;
    private rowIntervalSize;
    private handler;
    private viewport;
    constructor(width: number, height: number, dateRange: DateRange, renderDateRange: DateRange, columnIntervalSize: Duration, stickIntervalWidth: Duration, valueRange: ValueRange, rowIntervalSize: number);
    set setViewport(container: Container);
    render(): void;
}
