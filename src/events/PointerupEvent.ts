export class PointerupEvent extends Event {
    public static readonly NAME: string = 'pointerup'

    public readonly inner: PointerEvent

    public readonly position: { x: number, y: number }

    constructor(inner: PointerEvent) {
        super(PointerupEvent.NAME)

        this.inner = inner
        this.position = { x: inner.offsetX, y: inner.offsetY }
    }
}

