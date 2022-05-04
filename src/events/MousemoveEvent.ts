export class MousemoveEvent extends Event {
    public static readonly NAME: string = 'mousemove'

    public readonly inner: MouseEvent

    public readonly position: { x: number, y: number }

    constructor(inner: MouseEvent) {
        super(MousemoveEvent.NAME)

        this.inner = inner
        this.position = { x: inner.offsetX, y: inner.offsetY }
    }
}
