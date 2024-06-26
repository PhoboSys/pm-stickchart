export class ResolveWithdrawNocontestEvent extends Event {
    public static readonly NAME: string = 'resolvewithdrawnocontest'

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
        super(ResolveWithdrawNocontestEvent.NAME)

        this.roundid = roundid
        this.predictionid = predictionid
        this.erc20 = erc20
        this.inner = inner
    }
}

