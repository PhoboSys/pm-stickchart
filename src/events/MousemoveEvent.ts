export class MousemoveEvent extends Event {
    public static readonly NAME: string = 'mousemove'

    public readonly inner: MouseEvent
    public readonly pos: { x: number, y: number }

    constructor(inner?: MouseEvent) {
        super(MousemoveEvent.NAME)

        if (!inner) return

        this.inner = inner
        const { offsetX, offsetY } = inner
        this.pos = { x: offsetX, y: offsetY }
    }
}
