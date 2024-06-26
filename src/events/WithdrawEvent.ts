export class WithdrawEvent extends Event {
    public static readonly NAME: string = 'withdraw'

    public readonly inner: Event

    public readonly roundid: string

    public readonly predictionid: string

    public readonly erc20: string

    constructor(
        roundid: string,
        predictionid: string,
        erc20: string,
        inner: Event,
    ) {
        super(WithdrawEvent.NAME)

        this.inner = inner
        this.roundid = roundid
        this.predictionid = predictionid
        this.erc20 = erc20
    }
}

