export class TouchEndEvent extends Event {
    public static readonly NAME: string = 'touchend'

    constructor() {
        super(TouchEndEvent.NAME)
    }
}
