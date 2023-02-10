export class PointermoveEvent extends Event {
    public static readonly NAME: string = 'pointermove'

    public readonly inner: PointerEvent

    public readonly position: { x: number, y: number }
    public readonly movementX: number
    public readonly movementY: number

    constructor(inner: PointerEvent) {
        super(PointermoveEvent.NAME)

        this.inner = inner
        this.movementX = inner.movementX || 0
        this.movementY = inner.movementY || 0
        this.position = { x: inner.offsetX, y: inner.offsetY }
    }
}
