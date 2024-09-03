export class TouchStartEvent extends Event {
    public static readonly NAME: string = 'touchstart'

    multitouch = false

    constructor(inner: TouchEvent) {
        super(TouchStartEvent.NAME)

        this.multitouch = inner.touches.length === 2
    }
}
