export class CanvasErrorEvent extends Event {
    public static readonly NAME: string = 'error'

    constructor(
        public readonly inner: Event
    ) {
        super(CanvasErrorEvent.NAME)
    }
}

