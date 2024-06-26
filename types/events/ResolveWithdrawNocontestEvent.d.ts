export declare class ResolveWithdrawNocontestEvent extends Event {
    static readonly NAME: string;
    readonly inner: Event;
    readonly roundid: string;
    readonly pariid: string;
    readonly erc20: string;
    constructor(roundid: string, pariid: string, erc20: string, inner: Event);
}
