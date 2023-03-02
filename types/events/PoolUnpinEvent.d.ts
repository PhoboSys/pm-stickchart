export declare class PoolUnpinEvent extends Event {
    static readonly NAME: string;
    readonly inner: Event | undefined;
    readonly poolid: string;
    constructor(poolid: string, inner?: Event);
}
