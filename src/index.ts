import { Duration } from 'moment'

import { IStickChart } from './types'
import { DateRange } from './utils'

export { DateRange, ValueRange } from './utils'
export { Grid, CandleStick } from './components'
export { Application } from '@pixi/app'

export class StickChart {
    protected width: number

    protected height: number

    dateRange: DateRange

    segmentInterval: Duration

    stickInterval: Duration

    constructor({ width, height, dateRange, segmentDateInterval: segmentInterval, stickDateInterval: stickInterval }: IStickChart) {
        this.width = width
        this.height = height

        this.dateRange = dateRange
        this.segmentInterval = segmentInterval
        this.stickInterval = stickInterval
    }

}
