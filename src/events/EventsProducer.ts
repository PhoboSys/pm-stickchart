import { ZoomEvent, MouseleaveEvent, CanvasErrorEvent, MousemoveEvent } from '.'

export class EventsProducer {

    private readonly scroll: (e: WheelEvent) => void

    private readonly error: (e: Event) => void

    private readonly mousemove: (e: MouseEvent) => void
    private readonly mouseleave: (e: MouseEvent) => void

    constructor(
        private readonly target: EventTarget,
        private readonly canvas: HTMLCanvasElement,
        private readonly stage: HTMLElement,
    ) {

        const chartEventTarget = new EventTarget()

        global.chartEventTarget = chartEventTarget
        // bind to instance
        this.scroll = (e: WheelEvent) => this.target.dispatchEvent(new ZoomEvent(e))
        this.error = (e: Event) => this.target.dispatchEvent(new CanvasErrorEvent(e))
        this.mousemove = (e: MouseEvent) => this.target.dispatchEvent(new MousemoveEvent(e))
        this.mouseleave = (e: MouseEvent) => this.target.dispatchEvent(new MouseleaveEvent(e))

        this.canvas.addEventListener('webglcontextlost', this.error)
        this.stage.addEventListener('wheel', this.scroll)
        this.stage.addEventListener('mousemove', this.mousemove)
        this.stage.addEventListener('mouseleave', this.mouseleave)
    }

    destroy(): void {
        this.canvas.removeEventListener('webglcontextlost', this.error)
        this.stage.removeEventListener('wheel', this.scroll)
        this.stage.removeEventListener('mousemove', this.mousemove)
        this.stage.removeEventListener('mouseleave', this.mouseleave)
    }

}
