export declare class ClaimPariEvent extends Event {
    static readonly NAME: string;
    readonly inner: Event;
    readonly pariid: string;
    readonly erc20: string;
    constructor(pariid: string, erc20: string, inner: Event);
}
