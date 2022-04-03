export declare class ValueRange {
    from: number;
    to: number;
    constructor(from: any, to: any);
    findValuePoint(value: number): number;
    getIntervalsCount(interval: number): number;
    get value(): number;
    toString(): string;
}
