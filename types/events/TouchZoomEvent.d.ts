export declare class TouchZoomEvent extends Event {
    static readonly NAME: string;
    readonly inner: TouchEvent;
    readonly distance: number;
    readonly screen: {
        height: number;
        width: number;
    };
    constructor(inner: TouchEvent);
}
