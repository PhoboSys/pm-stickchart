import { IStickChart } from './types/stick_chart'
import { DateRange } from './utils/date_range'

export { DateRange } from './utils/date_range'
export { Grid } from './components/grid'
export { CandleStick } from './components/candle_stick'
export { ValueRange } from './utils/value_range'
export { Application } from '@pixi/app'

export class StickChart {
    protected width: number

    protected height: number

    dateRange: DateRange

    segmentInterval: DateRange

    stickInterval: DateRange

    constructor({ width, height, dateRange, segmentDateInterval: segmentInterval, stickDateInterval: stickInterval }: IStickChart) {
        this.width = width
        this.height = height

        this.dateRange = dateRange
        this.segmentInterval = segmentInterval
        this.stickInterval = stickInterval
    }

}
