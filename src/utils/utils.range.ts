import { Duration, Moment } from 'moment'

import { IRange } from '../data/interfaces/'

export abstract class Range<T, ValueType, IntervalType> {
    constructor(
        protected from: T,
        protected to: T,
    ) { }

    public get range(): IRange<T> {
        return { from: this.from, to: this.to }
    }

    public abstract get width(): number

    public abstract updateIf(value: T): Range<T, ValueType, IntervalType>

    public abstract getIntervalsCount(interval: IntervalType): number

    public abstract getPointByValue(value: ValueType): number
}

export class ValueRange extends Range<number, number, number> {
    public get width(): number {
        return this.to - this.from
    }

    public isNull(): boolean {
        return this.from === Infinity
    }

    public updateIf(value: number): ValueRange {
        this.from = Math.min(this.from, value)
        this.to = Math.max(this.to, value)

        return this
    }

    public expandFor(left: number, right: number): ValueRange {
        this.from += left
        this.to += right

        return this
    }

    public getPointByValue(value: number): number {
        return (value - this.from) / this.width
    }

    public getIntervalsCount(interval: number): number {
        return this.width / interval
    }

    public clone(): ValueRange {
        return new ValueRange(this.from, this.to)
    }
}

export class DateRange extends Range<Moment, Date, Duration> {
    static getBeginDistance(mainRange: DateRange, subRange: DateRange): number {
        return subRange.from.valueOf() - mainRange.from.valueOf()
    }

    public get width(): number {
        return this.to.valueOf() - this.from.valueOf()
    }

    public updateIf(value: Moment): DateRange {
        if (this.from.valueOf() > value.valueOf()) {
            this.from = value
        }

        if (this.to.valueOf() < value.valueOf()) {
            this.to = value
        }

        return this
    }

    public expandInMilliseconds(left: number, right: number): DateRange {
        this.from.add(left, 'milliseconds')
        this.to.add(right, 'milliseconds')

        return this
    }

    public getIntervalsCount(interval: Duration): number {
        return this.width / interval.asMilliseconds()
    }

    public getPointByValue(value: Date): number {
        return (value.valueOf() - this.from.valueOf()) / this.width
    }

    public clone(): DateRange {
        return new DateRange(this.from.clone(), this.to.clone())
    }
}
