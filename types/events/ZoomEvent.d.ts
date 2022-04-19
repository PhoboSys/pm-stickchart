export declare class ZoomEvent extends Event {
    static readonly NAME: string;
    readonly inner: WheelEvent;
    readonly zoom: number;
    readonly coefficient: number;
    constructor(inner: WheelEvent);
}
