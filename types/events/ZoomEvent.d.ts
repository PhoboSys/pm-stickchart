export declare class ZoomEvent extends Event {
    static readonly NAME: string;
    readonly inner: WheelEvent;
    readonly zoom: number;
    readonly position: {
        x: number;
        y: number;
    };
    readonly screen: {
        height: number;
        width: number;
    };
    readonly coefficient: number;
    constructor(inner: WheelEvent);
}
