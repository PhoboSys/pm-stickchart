export class ClaimPariEvent extends Event {
    public static readonly NAME: string = 'claimpari'

    public readonly inner: Event

    public readonly pari: object

    constructor(pari: object, inner: Event) {
        super(ClaimPariEvent.NAME)

        this.inner = inner
        this.pari = pari
    }
}

