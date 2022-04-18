export declare class ZoomEvent extends Event {
    static readonly NAME: string;
    inner: WheelEvent;
    zoom: number;
    constructor(inner: WheelEvent);
}
