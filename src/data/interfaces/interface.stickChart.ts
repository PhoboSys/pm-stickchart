import { Duration } from 'moment'

import { DateRange, PriceRange, ChartInputEvent, DataManager } from '../../utils'
import { ChartTypes } from '../enums'

import { IRawPricePoint, IStick, IPricePoint } from '.'

export interface IStickChartStyle {
    backgroundColor: number,
    backgroundOpacity: number,
    gridColor: number,
    gridOpacity: number,
    gridWidth: number,
    increaseColor: number,
    decreaseColor: number,
    stickRound: number,
    lineColor: number,
    lineWidth: number,
}

export interface IStickChartViewConfig {
    width: number
    height: number

    stickIntervalSize: number,

    columnIntervalSize: number
    dateRange: DateRange
}

export interface IStickChartOptions {
    style: IStickChartStyle

    viewConfig: IStickChartViewConfig

    chartType: ChartTypes

    dataManager: DataManager<IPricePoint | IStick, IRawPricePoint>
}

export interface IStickChartRenderConfig {
    dateRange: DateRange
    priceRange: PriceRange

    columnIntervalSize: number
    rowIntervalSize: number

    dataPriceRange?: PriceRange
}

export interface IStickChartState extends IStickChartOptions {
    renderConfig: IStickChartRenderConfig,

    inputEvent?: ChartInputEvent,
}
