export class ZoomEvent extends Event {
    public static readonly NAME: string = 'zoom'

    public inner: WheelEvent
    public zoom: number

    constructor(inner: WheelEvent) {
        super(ZoomEvent.NAME)

        this.inner = inner
        this.zoom = 0.01 * Math.sign(inner.deltaY)
    }
}
