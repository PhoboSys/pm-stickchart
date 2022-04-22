export declare class MousemoveEvent extends Event {
    static readonly NAME: string;
    readonly inner: MouseEvent;
    readonly pos: {
        x: number;
        y: number;
    };
    constructor(inner?: MouseEvent);
}
