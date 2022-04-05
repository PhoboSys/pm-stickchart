import { Duration } from 'moment';
import { DateRange, ValueRange } from '../utils';
import { IStick } from './interface.stick';
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
    zoomEvent: WheelEvent | undefined;
    renderSticks: IStick[];
}
