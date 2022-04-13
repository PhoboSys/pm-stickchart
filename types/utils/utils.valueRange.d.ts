export declare class ValueRange {
    private from;
    private to;
    constructor(from: number, to: number);
    get value(): number;
    inRange(point: number): boolean;
    getPointByValue(value: number): number;
    getIntervalsCount(interval: number): number;
    clone(): ValueRange;
    toString(): string;
}
