import { Duration } from 'moment'

import { DateRange, ValueRange } from '../utils'

export interface IStickChart {
    width: number,
    height: number,

    dateRange: DateRange
    renderDateRange: DateRange,

    segmentDateInterval: Duration,
    stickDateInterval: Duration,

    valueRange: ValueRange
    valueInterval: number
}
