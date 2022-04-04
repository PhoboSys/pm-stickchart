import { Duration } from 'moment';
import { DateRange } from '@utils/DateRange';
import { ValueRange } from '@utils/ValueRange';
export interface IStickChart {
    width: number;
    height: number;
    dateRange: DateRange;
    renderDateRange: DateRange;
    columnIntervalSize: Duration;
    stickIntervalWidth: Duration;
    valueRange: ValueRange;
    rowIntervalSize: number;
}
export interface StickChartState extends IStickChart {
    v: number;
}
