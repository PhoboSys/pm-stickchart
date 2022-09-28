export declare class PoolHoverEvent extends Event {
    static readonly NAME: string;
    readonly inner: Event;
    readonly poolid: string;
    constructor(poolid: string, inner: Event);
}
