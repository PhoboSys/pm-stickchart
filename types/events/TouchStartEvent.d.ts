export declare class TouchStartEvent extends Event {
    static readonly NAME: string;
    readonly multitouch: boolean;
    constructor(inner: TouchEvent);
}
