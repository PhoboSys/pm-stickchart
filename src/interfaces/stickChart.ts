import { Duration } from 'moment'

import { DateRange } from '@utils/DateRange'
import { ValueRange } from '@utils/ValueRange'

export interface IStickChart {
    width: number
    height: number

    dateRange: DateRange
    renderDateRange: DateRange

    segmentDateInterval: Duration
    stickDateInterval: Duration

    valueRange: ValueRange
    valueInterval: number
}

export interface IRenderStickChart {
    width: number
    height: number

    verticalSegmentsCount: number
    horizontalSegmentsCount: number

    segmentWidth: number
    segmentHeight: number

    firstVerticalSegmentX: number
    firstHorizontalSegmentY: number

    dateRange: DateRange
    renderDateRange: DateRange
    segmentDateInterval: Duration
    stickDateInterval: Duration

    valueRange: ValueRange
    valueInterval: number
}
