export declare class EventsProducer {
    private readonly target;
    private readonly canvas;
    private readonly stage;
    private readonly scroll;
    private readonly error;
    private readonly mouse;
    constructor(target: EventTarget, canvas: HTMLCanvasElement, stage: HTMLElement);
    destroy(): void;
}
