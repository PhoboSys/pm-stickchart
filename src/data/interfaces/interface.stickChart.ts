import { Duration } from 'moment'

import { ChartInputEvent } from '../../core'
import { DataManager } from '../../core/core.dataManager'
import { DateRange, ValueRange } from '../../utils'
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

    chartType: ChartTypes
    stickIntervalSize: Duration,

    columnIntervalSize: Duration
    dateRange: DateRange
}

export interface IStickChartOptions {
    style: IStickChartStyle

    viewConfig: IStickChartViewConfig

    data: IRawPricePoint[]
}

export interface IStickChartRenderConfig {
    dateRange: DateRange
    valueRange: ValueRange

    columnIntervalSize: Duration
    rowIntervalSize: number

    stickIntervalSize?: Duration,

    dataManager?: DataManager<IPricePoint | IStick>
}

export interface IStickChartState extends IStickChartOptions {
    renderConfig: IStickChartRenderConfig,
    inputEvent: ChartInputEvent,
}
