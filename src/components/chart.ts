import { Moment } from 'moment'

export type Position = {
    x: number,
    y: number
}

class DateRange {
    from: Moment

    to: Moment

    constructor(from, to) {
        this.from = from
        this.to = to
    }

    get milliseconds(): number {
        return this.to.valueOf() - this.from.valueOf()
    }

    findTimePoint(time: Moment): number {
        if (this.from.valueOf() > time.valueOf() || time.valueOf() > this.to.valueOf())
            throw new Error(`TimePoint(${time}) should fit in the ${this.toString()}`)

        return (time.valueOf() - this.from.valueOf()) / this.milliseconds
    }

    toString(): string {
        return `Range(from: ${this.from}, to: ${this.to})`
    }
}

class ValueRange {
    from: number

    to: number

    constructor(from, to) {
        this.from = from
        this.to = to
    }

    findValuePoint(value: number): number {
        if (this.from > value || this.to < value)
            throw new Error(`ValuePoint(${value}) should fit in the ${this.toString()}`)

        return (value - this.from) / this.value
    }

    get value(): number {
        return this.to - this.from
    }

    toString(): string {
        return `Range(from: ${this.from}, to: ${this.to})`
    }
}

type DateInterval = DateRange
type ValueInterval = ValueRange

export class Chart {
    protected width: number

    protected height: number

    dateRange: DateRange

    segmentInterval: DateInterval

    stickInterval: DateInterval

    constructor({ width, height, dateRange, segmentDateInterval: segmentInterval, stickDateInterval: stickInterval }: ChartOptions) {
        this.width = width
        this.height = height

        this.dateRange = dateRange
        this.segmentInterval = segmentInterval
        this.stickInterval = stickInterval
    }

}
