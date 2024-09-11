export class TouchStartEvent extends Event {
    public static readonly NAME: string = 'touchstart'

    public readonly multitouch: boolean = false

    constructor(inner: TouchEvent) {
        super(TouchStartEvent.NAME)

        this.multitouch = inner.touches.length === 2
    }
}
