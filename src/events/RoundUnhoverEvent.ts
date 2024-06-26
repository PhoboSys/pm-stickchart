export class RoundUnhoverEvent extends Event {
    public static readonly NAME: string = 'roundunhover'

    public readonly inner: Event | undefined

    public readonly roundid: string

    constructor(roundid: string, inner?: Event) {
        super(RoundUnhoverEvent.NAME)

        this.inner = inner
        this.roundid = roundid
    }
}

