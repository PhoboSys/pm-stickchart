export class RoundPinEvent extends Event {
    public static readonly NAME: string = 'roundpin'

    public readonly inner: Event | undefined

    public readonly roundid: string

    constructor(roundid: string, inner?: Event) {
        super(RoundPinEvent.NAME)

        this.inner = inner
        this.roundid = roundid
    }
}

