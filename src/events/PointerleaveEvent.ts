export class PointerleaveEvent extends Event {
    public static readonly NAME: string = 'pointerleave'

    public readonly inner: PointerEvent

    public readonly position: { x: number, y: number }

    constructor(inner: PointerEvent) {
        super(PointerleaveEvent.NAME)

        this.inner = inner
        this.position = { x: inner.offsetX, y: inner.offsetY }
    }
}
