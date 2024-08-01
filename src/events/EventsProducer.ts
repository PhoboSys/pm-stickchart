import { ZoomEvent, CanvasErrorEvent, TouchZoomEvent, TouchEndEvent } from '@events'
import { PointerupEvent, PointermoveEvent, PointerdownEvent, PointerleaveEvent } from '@events'

export class EventsProducer {

    private readonly scroll: (e: WheelEvent) => any

    private readonly error: (e: Event) => any

    private readonly pointermove: (e: PointerEvent) => any

    private readonly pointerleave: (e: PointerEvent) => any

    private readonly pointerup: (e: PointerEvent) => any

    private readonly pointerdown: (e: PointerEvent) => any

    private readonly touchzoom: (e: TouchEvent) => any

    private readonly touchend: (e: TouchEvent) => any

    constructor(
        private readonly target: EventTarget,
        private readonly canvas: HTMLCanvasElement,
        private readonly stage: HTMLElement,
        private readonly isMobile: boolean
    ) {
        // bind to instance
        this.scroll = (e: WheelEvent): boolean => this.target.dispatchEvent(new ZoomEvent(e))
        this.error = (e: Event): boolean => this.target.dispatchEvent(new CanvasErrorEvent(e))

        this.pointermove = (e: PointerEvent): boolean => this.target.dispatchEvent(new PointermoveEvent(e))
        this.pointerleave = (e: PointerEvent): boolean => this.target.dispatchEvent(new PointerleaveEvent(e))
        this.pointerup = (e: PointerEvent): boolean => this.target.dispatchEvent(new PointerupEvent(e))
        this.pointerdown = (e: PointerEvent): boolean => this.target.dispatchEvent(new PointerdownEvent(e))

        this.touchzoom = (e: TouchEvent): boolean => {
            if (e.touches.length === 2) {
                return this.target.dispatchEvent(new TouchZoomEvent(e))
            }

            return false
        }

        this.touchend = (e: TouchEvent): boolean => {
            if (e.touches.length === 0) {
                return this.target.dispatchEvent(new TouchEndEvent())
            }

            return false
        }

        this.stage.addEventListener('pointerup', this.pointerup)
        this.stage.addEventListener('pointerdown', this.pointerdown)
        this.stage.addEventListener('pointermove', this.pointermove)
        this.stage.addEventListener('pointerleave', this.pointerleave)
        this.canvas.addEventListener('webglcontextlost', this.error)

        if (this.isMobile) {
            this.stage.addEventListener('touchmove', this.touchzoom)
            this.stage.addEventListener('touchend', this.touchend)

        } else {
            this.stage.addEventListener('wheel', this.scroll)
        }
    }

    public destroy(): void {
        this.canvas.removeEventListener('webglcontextlost', this.error)

        if (this.isMobile) {
            this.stage.removeEventListener('touchmove', this.touchzoom)
            this.stage.removeEventListener('touchend', this.touchend)

        } else {
            this.stage.removeEventListener('wheel', this.scroll)
        }
    }

}
