export class ClaimPariEvent extends Event {
    public static readonly NAME: string = 'claimpari'

    public readonly inner: Event

    public readonly pariid: string
    public readonly erc20: string

    constructor(pariid: string, erc20: string, inner: Event) {
        super(ClaimPariEvent.NAME)

        this.inner = inner
        this.pariid = pariid
        this.erc20 = erc20
    }
}

