import moment, { duration } from 'moment'

import { InputEventTypes } from './data/enums/enum.inputEventTypes'
import { IStickChartStyle, IRawPricePoint } from './data/interfaces'
import { ChartInputEvent } from './utils/utils.inputEvent'
import { PriceRange, DateRange } from './utils/utils.range'

export const defaultStickChartStyle: IStickChartStyle = {
    backgroundColor: 0x303134,
    backgroundOpacity: 1,
    gridColor: 0xFFFFFF,
    gridOpacity: 0.1,
    gridWidth: 1,
    increaseColor: 0x4CAF50,
    decreaseColor: 0xF05350,
    stickRound: 20,
    lineColor: 0x4CAF50,
}

export const defaultInputEvent = new ChartInputEvent(null, InputEventTypes.none)

export const defaultStickChartData: IRawPricePoint[] = []

export const defaultChartDateRange = (): DateRange =>
    new DateRange(
        moment().subtract(10, 'minutes'),
        moment().add(10, 'minutes'),
    )

export const defaultColumnIntervalSize = duration(1, 'minute')
export const defaultStickIntervalSize = duration(20, 'seconds')

export const defaultChartPriceRange = new PriceRange(0, 10)
export const defaultIntervalRowSize = 1
