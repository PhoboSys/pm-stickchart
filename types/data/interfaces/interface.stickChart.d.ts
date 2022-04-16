import { DateRange, PriceRange, ChartInputEvent, DataManager } from '../../utils';
import { ChartTypes } from '../enums';
import { IRawPricePoint, IStick, IPricePoint } from '.';
export interface IStickChartStyle {
    backgroundColor: number;
    backgroundOpacity: number;
    gridColor: number;
    gridOpacity: number;
    gridWidth: number;
    stickIncreaseColor: number;
    stickDecreaseColor: number;
    stickRound: number;
    stickLineWidth: number;
    lineColor: number;
    lineWidth: number;
    zoomVelocity: number;
    scrollVelocity: number;
}
export interface IStickChartOptions {
    width: number;
    height: number;
    style?: IStickChartStyle;
    stickIntervalSize?: number;
    columnIntervalSize?: number;
    dateRange?: DateRange;
    chartType?: ChartTypes;
    data?: IRawPricePoint[];
}
export interface IStickChartConfig {
    width: number;
    height: number;
    style: IStickChartStyle;
    stickIntervalSize: number;
    columnIntervalSize: number;
    dateRange: DateRange;
    chartType: ChartTypes;
    data: IRawPricePoint[];
}
export interface IRenderConfig {
    dateRange: DateRange;
    priceRange: PriceRange;
    columnIntervalSize: number;
    rowIntervalSize: number;
    dataPriceRange?: PriceRange;
}
export interface IBasicConfig {
    width: number;
    height: number;
    style: IStickChartStyle;
    stickIntervalSize: number;
    dateRange: DateRange;
}
export interface IState {
    basicConfig: IBasicConfig;
    renderConfig: IRenderConfig;
    chartType: ChartTypes;
    dataManager: DataManager<IPricePoint | IStick, IRawPricePoint>;
    inputEvent?: ChartInputEvent;
}
