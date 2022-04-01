import { Moment } from 'moment'

export class DateRange {
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
