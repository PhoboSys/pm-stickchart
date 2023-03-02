export declare class PoolPinEvent extends Event {
    static readonly NAME: string;
    readonly inner: Event | undefined;
    readonly poolid: string;
    constructor(poolid: string, inner?: Event);
}
