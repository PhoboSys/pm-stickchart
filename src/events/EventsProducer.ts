import { ZoomEvent, PointermoveEvent, CanvasErrorEvent } from '.'

export class EventsProducer {

    private readonly scroll: (e: WheelEvent) => any

    private readonly error: (e: Event) => any

    constructor(
        private readonly target: EventTarget,
        private readonly canvas: HTMLCanvasElement,
        private readonly stage: HTMLElement,
    ) {
        // bind to instance
        this.scroll = (e: WheelEvent) => this.target.dispatchEvent(new ZoomEvent(e))
        this.error = (e: Event) => this.target.dispatchEvent(new CanvasErrorEvent(e))

        this.canvas.addEventListener('webglcontextlost', this.error)
        this.stage.addEventListener('wheel', this.scroll)
    }

    destroy() {
        this.canvas.removeEventListener('webglcontextlost', this.error)
        this.stage.removeEventListener('wheel', this.scroll)
    }

}
