import { Duration } from 'moment';
import { ChartInputEvent } from '../core';
import { ChartTypes } from '../enums';
import { DateRange, ValueRange } from '../utils';
export interface IStickChartStyle {
    backgroundColor: number;
    backgroundOpacity: number;
    gridColor: number;
    gridOpacity: number;
    gridWidth: number;
    increaseColor: number;
    decreaseColor: number;
    stickRound: number;
    lineColor: number;
}
export interface IStickChartViewConfig {
    width: number;
    height: number;
    chartType?: ChartTypes;
    columnIntervalSize?: Duration;
    dateRange: DateRange;
}
export interface IStickChartOptions {
    style: IStickChartStyle;
    viewConfig: IStickChartViewConfig;
}
export interface IStickChartRenderConfig {
    dateRange: DateRange;
    valueRange: ValueRange;
    columnIntervalSize: Duration;
    rowIntervalSize: number;
}
export interface IStickChartState extends IStickChartOptions {
    renderConfig: IStickChartRenderConfig;
    inputEvent: ChartInputEvent;
}
