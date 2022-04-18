import { Moment } from 'moment'

export class DateRange {
    constructor(
        private from: Moment,
        private to: Moment,
    ) { }

    public get duration(): number {
        return this.to.valueOf() - this.from.valueOf()
    }

    static getBeginDistance(mainRange: DateRange, subRange: DateRange): number {
        return subRange.from.valueOf() - mainRange.from.valueOf()
    }

    public moveRangeInMilliseconds(from: number, to: number): void {
        this.from.add(from, 'milliseconds')
        this.to.add(to, 'milliseconds')
    }

    public getIntervalsCount(interval: number): number {
        return this.duration / interval
    }

    public getPointByDate(timestamp: Date): number {
        return (timestamp.valueOf() - this.from.valueOf()) / this.duration
    }

    public clone(): DateRange {
        return new DateRange(this.from.clone(), this.to.clone())
    }

    public toString(): string {
        return `Range(from: ${this.from}, to: ${this.to})`
    }
}
