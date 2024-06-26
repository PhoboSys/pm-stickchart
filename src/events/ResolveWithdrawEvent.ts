import { PricefeedPoint } from '@chartdata'

export class ResolveWithdrawEvent extends Event {
    public static readonly NAME: string = 'resolvewithdraw'

    public readonly inner: Event

    public readonly roundid: string

    public readonly pariid: string

    public readonly erc20: string

    public readonly resolutionPrice: PricefeedPoint

    public readonly controlPrice: PricefeedPoint

    constructor(
        roundid: string,
        pariid: string,
        erc20: string,
        resolutionPrice: PricefeedPoint,
        controlPrice: PricefeedPoint,
        inner: Event,
    ) {
        super(ResolveWithdrawEvent.NAME)

        this.roundid = roundid
        this.pariid = pariid
        this.erc20 = erc20
        this.resolutionPrice = resolutionPrice
        this.controlPrice = controlPrice
        this.inner = inner
    }
}

