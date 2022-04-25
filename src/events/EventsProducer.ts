import { ZoomEvent, MousemoveEvent, CanvasErrorEvent } from '.'

export class EventsProducer {

    private readonly scroll: (e: WheelEvent) => any
    private readonly error: (e: Event) => any
    private readonly mouse: (e: MouseEvent) => any

    constructor(
        private readonly target: EventTarget,
        private readonly canvas: HTMLCanvasElement,
        private readonly stage: HTMLElement,
    ) {
        // bind to instance
        this.scroll = (e: WheelEvent) => this.target.dispatchEvent(new ZoomEvent(e))
        this.error = (e: Event) => this.target.dispatchEvent(new CanvasErrorEvent(e))
        this.mouse = (e: MouseEvent) => this.target.dispatchEvent(new MousemoveEvent(e))

		this.canvas.addEventListener('webglcontextlost', this.error)
        this.stage.addEventListener('wheel', this.scroll)
        // this.stage.addEventListener('mousemove', this.mouse)
        // this.stage.addEventListener('mouseleave', this.mouse)
    }

    destroy() {
		this.canvas.removeEventListener('webglcontextlost', this.error)
        this.stage.removeEventListener('wheel', this.scroll)
        // this.stage.removeEventListener('mousemove', this.mouse)
        // this.stage.removeEventListener('mouseleave', this.mouse)
    }

}
