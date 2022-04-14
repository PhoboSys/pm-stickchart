import { Duration, Moment } from 'moment';
import { IRange } from '../data/interfaces/';
export declare abstract class Range<T, ValueType, IntervalType> {
    protected from: T;
    protected to: T;
    constructor(from: T, to: T);
    get range(): IRange<T>;
    abstract get width(): number;
    abstract updateIf(value: T): Range<T, ValueType, IntervalType>;
    abstract getIntervalsCount(interval: IntervalType): number;
    abstract getPointByValue(value: ValueType): number;
}
export declare class ValueRange extends Range<number, number, number> {
    get width(): number;
    isNull(): boolean;
    updateIf(value: number): ValueRange;
    expandFor(left: number, right: number): ValueRange;
    getPointByValue(value: number): number;
    getIntervalsCount(interval: number): number;
    clone(): ValueRange;
}
export declare class DateRange extends Range<Moment, Date, Duration> {
    static getBeginDistance(mainRange: DateRange, subRange: DateRange): number;
    get width(): number;
    updateIf(value: Moment): DateRange;
    expandInMilliseconds(left: number, right: number): DateRange;
    getIntervalsCount(interval: Duration): number;
    getPointByValue(value: Date): number;
    clone(): DateRange;
}
