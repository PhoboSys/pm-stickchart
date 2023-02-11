export declare class PointermoveEvent extends Event {
    static readonly NAME: string;
    readonly inner: PointerEvent;
    readonly position: {
        x: number;
        y: number;
    };
    readonly screen: {
        height: number;
        width: number;
    };
    readonly movementX: number;
    readonly movementY: number;
    constructor(inner: PointerEvent);
}
