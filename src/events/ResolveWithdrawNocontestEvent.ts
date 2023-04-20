export class ResolveWithdrawNocontestEvent extends Event {
    public static readonly NAME: string = 'resolvewithdrawnocontest'

    public readonly inner: Event

    public readonly poolid: string

    public readonly pariid: string

    public readonly erc20: string

    constructor(
        poolid: string,
        pariid: string,
        erc20: string,
        inner: Event,
    ) {
        super(ResolveWithdrawNocontestEvent.NAME)

        this.poolid = poolid
        this.pariid = pariid
        this.erc20 = erc20
        this.inner = inner
    }
}

