import { Moment, Duration } from 'moment';
export declare class DateRange {
    protected from: Moment;
    protected to: Moment;
    constructor(from: Moment, to: Moment);
    get duration(): number;
    static getBeginDistance(mainRange: DateRange, subRange: DateRange): number;
    moveRangeInMilliseconds(from: number, to: number): void;
    getIntervalsCount(interval: Duration): number;
    getPointByDate(date: Date): number;
    toString(): string;
}
