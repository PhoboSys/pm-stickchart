export declare class PointermoveEvent extends Event {
    static readonly NAME: string;
    readonly inner: PointerEvent;
    readonly position: {
        x: number;
        y: number;
    };
    constructor(inner: PointerEvent);
}
