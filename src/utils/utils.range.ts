import { Duration, Moment } from 'moment'

import { IRange } from '../data/interfaces/'

export abstract class Range<T> {
    constructor(
        protected from: T,
        protected to: T,
    ) { }

    public get range(): IRange<T> {
        return { from: this.from, to: this.to }
    }

    public abstract get length(): number

    public abstract update(value: T): Range<T>

    public abstract getIntervalsCount(interval: number): number

    public abstract getPointByValue(value: T): number
}

export class PriceRange extends Range<number> {
    public get length(): number {
        return this.to - this.from
    }

    public update(value: number): PriceRange {
        this.from = Math.min(this.from, value)
        this.to = Math.max(this.to, value)

        return this
    }

    public move(left: number, right: number): PriceRange {
        this.from += left
        this.to += right

        return this
    }

    public getPointByValue(value: number): number {
        return (value - this.from) / this.length
    }

    public getIntervalsCount(interval: number): number {
        return this.length / interval
    }

    public clone(): PriceRange {
        return new PriceRange(this.from, this.to)
    }
}

export class DateRange extends Range<Date> {
    static getBeginDistance(mainRange: DateRange, subRange: DateRange): number {
        return subRange.from.valueOf() - mainRange.from.valueOf()
    }

    public get length(): number {
        return this.to.valueOf() - this.from.valueOf()
    }

    public update(value: Date): DateRange {
        if (this.from.valueOf() > value.valueOf()) {
            this.from = value
        }

        if (this.to.valueOf() < value.valueOf()) {
            this.to = value
        }

        return this
    }

    public expandInMilliseconds(left: number, right: number): DateRange {
        this.from = new Date(this.from.valueOf() + left)
        this.to = new Date(this.from.valueOf() + right)

        return this
    }

    public getIntervalsCount(interval: number): number {
        return this.length / interval
    }

    public getPointByValue(value: Date): number {
        return (value.valueOf() - this.from.valueOf()) / this.length
    }

    public clone(): DateRange {
        return new DateRange(this.from, this.to)
    }
}
