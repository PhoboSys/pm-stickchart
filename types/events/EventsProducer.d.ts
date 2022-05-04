export declare class EventsProducer {
    private readonly targets;
    private readonly canvas;
    private readonly stage;
    private readonly scroll;
    private readonly error;
    private readonly mousemove;
    private readonly mouseleave;
    constructor(targets: EventTarget[], canvas: HTMLCanvasElement, stage: HTMLElement);
    destroy(): void;
    private dispatchToAll;
}
