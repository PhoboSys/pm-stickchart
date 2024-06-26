export declare class RoundUnpinEvent extends Event {
    static readonly NAME: string;
    readonly inner: Event | undefined;
    readonly roundid: string;
    constructor(roundid: string, inner?: Event);
}
