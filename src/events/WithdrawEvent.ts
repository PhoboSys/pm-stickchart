export class WithdrawEvent extends Event {
    public static readonly NAME: string = 'withdraw'

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
        super(WithdrawEvent.NAME)

        this.inner = inner
        this.poolid = poolid
        this.pariid = pariid
        this.erc20 = erc20
    }
}

