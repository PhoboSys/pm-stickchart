import { ZoomEvent, PointermoveEvent, CanvasErrorEvent, PointerleaveEvent } from '.'

export class EventsProducer {

    private readonly scroll: (e: WheelEvent) => any

    private readonly error: (e: Event) => any

    private readonly pointermove: (e: PointerEvent) => any

    private readonly pointerleave: (e: PointerEvent) => any

    constructor(
        private readonly target: EventTarget,
        private readonly canvas: HTMLCanvasElement,
        private readonly stage: HTMLElement,
    ) {
        // bind to instance
        this.scroll = (e: WheelEvent) => this.target.dispatchEvent(new ZoomEvent(e))
        this.error = (e: Event) => this.target.dispatchEvent(new CanvasErrorEvent(e))

        this.pointermove = (e: PointerEvent) => this.target.dispatchEvent(new PointermoveEvent(e))
        this.pointerleave = (e: PointerEvent) => this.target.dispatchEvent(new PointerleaveEvent(e))

        this.canvas.addEventListener('webglcontextlost', this.error)
        this.stage.addEventListener('wheel', this.scroll)
        this.stage.addEventListener('pointermove', this.pointermove)
        this.stage.addEventListener('pointerleave', this.pointerleave)
    }

    public destroy(): void {
        this.canvas.removeEventListener('webglcontextlost', this.error)
        this.stage.removeEventListener('wheel', this.scroll)

        this.stage.removeEventListener('pointermove', this.pointermove)
        this.stage.removeEventListener('pointerleave', this.pointerleave)
    }

}
