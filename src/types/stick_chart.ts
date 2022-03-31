import { Duration } from 'moment'

import { DateRange } from '../utils/date_range'
import { ValueRange } from '../utils/value_range'

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
