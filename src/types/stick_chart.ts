import { DateRange } from '../utils/date_range'
import { ValueRange } from '../utils/value_range'

export interface IStickChart {
    width: number,
    height: number,

    dateRange: DateRange,
    segmentDateInterval: DateRange,
    stickDateInterval: DateRange,

    valueRange: ValueRange
    valueInterval: ValueRange
}
