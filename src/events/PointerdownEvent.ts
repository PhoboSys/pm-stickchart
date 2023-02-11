export class PointerdownEvent extends Event {
    public static readonly NAME: string = 'pointerdown'

    public readonly inner: PointerEvent

    public readonly position: { x: number, y: number }

    constructor(inner: PointerEvent) {
        super(PointerdownEvent.NAME)

        this.inner = inner
        this.position = { x: inner.offsetX, y: inner.offsetY }
    }
}

