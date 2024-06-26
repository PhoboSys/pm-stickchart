export class RoundUnpinEvent extends Event {
    public static readonly NAME: string = 'roundunpin'

    public readonly inner: Event | undefined

    public readonly roundid: string

    constructor(roundid: string, inner?: Event) {
        super(RoundUnpinEvent.NAME)

        this.inner = inner
        this.roundid = roundid
    }
}

