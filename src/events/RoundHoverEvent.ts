export class RoundHoverEvent extends Event {
    public static readonly NAME: string = 'roundhover'

    public readonly inner: Event | undefined

    public readonly roundid: string

    constructor(roundid: string, inner?: Event) {
        super(RoundHoverEvent.NAME)

        this.inner = inner
        this.roundid = roundid
    }
}

