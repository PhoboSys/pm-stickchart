export class WithdrawEvent extends Event {
    public static readonly NAME: string = 'withdraw'

    public readonly inner: Event

    public readonly roundid: string

    public readonly pariid: string

    public readonly erc20: string

    constructor(
        roundid: string,
        pariid: string,
        erc20: string,
        inner: Event,
    ) {
        super(WithdrawEvent.NAME)

        this.inner = inner
        this.roundid = roundid
        this.pariid = pariid
        this.erc20 = erc20
    }
}

