import { Duration } from 'moment'

import { DateRange, ValueRange } from '@src/utils'

export interface IRenderGrid {
    width: number
    height: number

    dateRange: DateRange
    renderDateRange: DateRange

    columnIntervalSize: Duration

    valueRange: ValueRange

    rowIntervalSize: number
}
