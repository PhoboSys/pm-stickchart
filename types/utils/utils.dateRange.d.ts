import { Moment } from 'moment';
export declare class DateRange {
    private from;
    private to;
    constructor(from: Moment, to: Moment);
    get duration(): number;
    static getBeginDistance(mainRange: DateRange, subRange: DateRange): number;
    moveRangeInMilliseconds(from: number, to: number): void;
    getIntervalsCount(interval: number): number;
    getPointByDate(timestamp: Date): number;
    clone(): DateRange;
    toString(): string;
}
