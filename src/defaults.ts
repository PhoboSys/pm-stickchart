import moment, { duration } from 'moment'

import { ChartTypes } from './data/enums/enum.chartTypes'
import { InputEventTypes } from './data/enums/enum.inputEventTypes'
import { IStickChartStyle, IRawPricePoint } from './data/interfaces'
import { IStickChartOptions } from './data/interfaces/interface.stickChart'
import { ITextStyle } from './libs/pixi'
import { ChartInputEvent } from './utils/utils.inputEvent'
import { PriceRange, DateRange } from './utils/utils.range'

export const defaultStickChartStyle: IStickChartStyle = {
    backgroundColor: 0x303134,
    backgroundOpacity: 1,

    gridColor: 0xFFFFFF,
    gridOpacity: 0.1,
    gridWidth: 1,
    gridBottomPadding: 20,

    stickIncreaseColor: 0x4CAF50,
    stickDecreaseColor: 0xF05350,
    stickLineWidth: 2,

    markHorSpace: 5,
    markStyle: {
        fontSize: 15,
        fill: 0xFFFFFF,
        verticalBottomPadding: 5,
        horizontalBottomPadding: 5,
        horizontalRightPadding: 10,
        alpha: 1,
    },

    stickRound: 20,
    lineColor: 0x4CAF50,
    lineWidth: 3,

    zoomVelocity: 1.5,
    scrollVelocity: 1,

    resolution: 1,
}

export const defaultInputEvent = new ChartInputEvent(null, InputEventTypes.none)

export const defaultStickChartData: IRawPricePoint[] = []

export const defaultStickChartType: ChartTypes = ChartTypes.lines

export const defaultChartDateRange = (): DateRange => {
    const now = moment().seconds(0).milliseconds(0)

    return new DateRange(
        now.subtract(10, 'minutes').toDate(),
        now.add(10, 'minutes').toDate(),
    )
}

export const defaultColumnIntervalSize = duration(5, 'seconds').asMilliseconds()
export const defaultStickIntervalSize = duration(20, 'seconds').asMilliseconds()

export const defaultChartPriceRange = new PriceRange(0, 7)
export const defaultRowIntervalSize = 1

export const defaultStickChartOptions = (): IStickChartOptions => ({
    width: 100,
    height: 100,
    style: defaultStickChartStyle,
    stickIntervalSize: defaultStickIntervalSize,
    columnIntervalSize: defaultColumnIntervalSize,
    dateRange: defaultChartDateRange(),
    chartType: defaultStickChartType,
    data: defaultStickChartData,
})
