export declare class ClaimPariEvent extends Event {
    static readonly NAME: string;
    readonly inner: Event;
    readonly pari: object;
    constructor(pari: object, inner: Event);
}
