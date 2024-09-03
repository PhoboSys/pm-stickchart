export declare class TouchStartEvent extends Event {
    static readonly NAME: string;
    multitouch: boolean;
    constructor(inner: TouchEvent);
}
