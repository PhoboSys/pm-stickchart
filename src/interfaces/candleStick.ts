import { Duration } from 'moment'

import { DateRange, ValueRange } from '@src/utils'
export interface ICandleStick {
    low: number,
    high: number,
    open: number,
    close: number,
    date: Date,
}

export interface IRenderCandleStick extends ICandleStick {
    width: number
    height: number

    renderDateRange: DateRange

    stickIntervalWidth: Duration

    valueRange: ValueRange
}
