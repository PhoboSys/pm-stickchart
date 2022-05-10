export declare class EventsProducer {
    private readonly target;
    private readonly canvas;
    private readonly stage;
    private readonly scroll;
    private readonly error;
    constructor(target: EventTarget, canvas: HTMLCanvasElement, stage: HTMLElement);
    destroy(): void;
}
