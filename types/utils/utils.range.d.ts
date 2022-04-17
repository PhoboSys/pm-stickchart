import { IRange } from '../data/interfaces/';
export declare abstract class Range<T> {
    protected from: T;
    protected to: T;
    constructor(from: T, to: T);
    get range(): IRange<T>;
    abstract get length(): number;
    abstract update(value: T): Range<T>;
    abstract getIntervalsCount(interval: number): number;
    abstract getPointByValue(value: T): number;
}
export declare class PriceRange extends Range<number> {
    get length(): number;
    update(value: number): PriceRange;
    move(left: number, right: number): PriceRange;
    getPointByValue(value: number): number;
    getIntervalsCount(interval: number): number;
    clone(): PriceRange;
}
export declare class DateRange extends Range<Date> {
    static getBeginDistance(mainRange: DateRange, subRange: DateRange): number;
    get length(): number;
    isContain(date: number): boolean;
    update(value: Date): DateRange;
    moveInMilliseconds(left: number, right: number): DateRange;
    getIntervalsCount(interval: number): number;
    getPointByValue(value: Date): number;
    clone(): DateRange;
}
