import { Duration } from 'moment'

import { ChartInputEvent } from '../../core'
import { DateRange, ValueRange } from '../../utils'
import { DataManager } from '../../utils/utils.dataManager'
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
}

export interface IStickChartViewConfig {
    width: number
    height: number

    stickIntervalSize: Duration,

    columnIntervalSize: Duration
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
    valueRange: ValueRange

    columnIntervalSize: Duration
    rowIntervalSize: number
}

export interface IStickChartState extends IStickChartOptions {
    renderConfig: IStickChartRenderConfig,

    inputEvent: ChartInputEvent,
}
