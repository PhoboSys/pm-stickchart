export declare class PointertapEvent extends Event {
    static readonly NAME: string;
    readonly inner: PointerEvent;
    readonly position: {
        x: number;
        y: number;
    };
    constructor(inner: PointerEvent);
}
