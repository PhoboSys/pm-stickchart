export declare class EventsProducer {
    private readonly target;
    private readonly canvas;
    private readonly stage;
    private readonly isMobile;
    private readonly scroll;
    private readonly error;
    private readonly pointermove;
    private readonly pointerleave;
    private readonly pointerup;
    private readonly pointerdown;
    private readonly touchzoom;
    constructor(target: EventTarget, canvas: HTMLCanvasElement, stage: HTMLElement, isMobile: boolean);
    destroy(): void;
}
