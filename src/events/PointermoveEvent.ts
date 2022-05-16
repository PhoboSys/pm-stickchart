export class PointermoveEvent extends Event {
    public static readonly NAME: string = 'pointermove'

    public readonly inner: PointerEvent

    public readonly position: { x: number, y: number }

    constructor(inner: PointerEvent) {
        super(PointermoveEvent.NAME)

        this.inner = inner
        this.position = { x: inner.offsetX, y: inner.offsetY }
    }
}
