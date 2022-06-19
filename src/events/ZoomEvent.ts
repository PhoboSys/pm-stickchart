import config from '@config'

export class ZoomEvent extends Event {
    public static readonly NAME: string = 'zoom'

    public readonly inner: WheelEvent

    public readonly zoom: number

    public readonly coefficient: number = 0.1 * (config.zoom.speed / 100)

    constructor(inner: WheelEvent) {
        super(ZoomEvent.NAME)

        this.inner = inner
        this.zoom = this.coefficient * Math.sign(inner.deltaY)
    }
}
