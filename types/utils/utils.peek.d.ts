export declare class Peek<T> {
    max: T;
    min: T;
    private isSmaller;
    constructor(max: T, min: T, isSmaller: (target: T, value: T) => boolean);
    changePeek(...values: T[]): void;
}
