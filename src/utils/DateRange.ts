import { Moment, Duration } from 'moment'

export class DateRange {
    protected from: Moment

    protected to: Moment

    constructor(from: Moment, to: Moment) {
        this.from = from
        this.to = to
    }

    get duration(): number {
        return this.to.valueOf() - this.from.valueOf()
    }

    static getBeginDistance(mainRange: DateRange, subRange: DateRange): number {
        return subRange.from.valueOf() - mainRange.from.valueOf()
    }

    getIntervalsCount(interval: Duration): number {
        return this.duration / interval.asMilliseconds()
    }

    getPointByDate(date: Date): number {
        return (date.valueOf() - this.from.valueOf()) / this.duration
    }

    toString(): string {
        return `Range(from: ${this.from}, to: ${this.to})`
    }
}
