export class MouseleaveEvent extends Event {
    public static readonly NAME: string = 'mouseleave'

    public readonly inner: MouseEvent

    public readonly position: { x: number, y: number }

    constructor(inner: MouseEvent) {
        super(MouseleaveEvent.NAME)

        this.inner = inner
        this.position = { x: inner.offsetX, y: inner.offsetY }
    }
}
