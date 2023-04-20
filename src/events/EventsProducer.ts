import { ZoomEvent, CanvasErrorEvent } from '@events'
import { PointerupEvent, PointermoveEvent, PointerdownEvent, PointerleaveEvent } from '@events'

export class EventsProducer {

    private readonly scroll: (e: WheelEvent) => any

    private readonly error: (e: Event) => any

    private readonly pointermove: (e: PointerEvent) => any

    private readonly pointerleave: (e: PointerEvent) => any

    private readonly pointerup: (e: PointerEvent) => any

    private readonly pointerdown: (e: PointerEvent) => any

    constructor(
        private readonly target: EventTarget,
        private readonly canvas: HTMLCanvasElement,
        private readonly stage: HTMLElement,
    ) {
        // bind to instance
        this.scroll = (e: WheelEvent): boolean => this.target.dispatchEvent(new ZoomEvent(e))
        this.error = (e: Event): boolean => this.target.dispatchEvent(new CanvasErrorEvent(e))

        this.pointermove = (e: PointerEvent): boolean => this.target.dispatchEvent(new PointermoveEvent(e))
        this.pointerleave = (e: PointerEvent): boolean => this.target.dispatchEvent(new PointerleaveEvent(e))
        this.pointerup = (e: PointerEvent): boolean => this.target.dispatchEvent(new PointerupEvent(e))
        this.pointerdown = (e: PointerEvent): boolean => this.target.dispatchEvent(new PointerdownEvent(e))

        this.canvas.addEventListener('webglcontextlost', this.error)
        this.stage.addEventListener('wheel', this.scroll)
        this.stage.addEventListener('pointerup', this.pointerup)
        this.stage.addEventListener('pointerdown', this.pointerdown)
        this.stage.addEventListener('pointermove', this.pointermove)
        this.stage.addEventListener('pointerleave', this.pointerleave)
    }

    public destroy(): void {
        this.canvas.removeEventListener('webglcontextlost', this.error)

        this.stage.removeEventListener('wheel', this.scroll)

        this.stage.removeEventListener('pointerup', this.pointerup)
        this.stage.removeEventListener('pointerdown', this.pointerdown)
        this.stage.removeEventListener('pointermove', this.pointermove)
        this.stage.removeEventListener('pointerleave', this.pointerleave)
    }

}
