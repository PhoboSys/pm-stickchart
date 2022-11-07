import { PricefeedPoint } from '../chartdata'

export class SettlePoolEvent extends Event {
    public static readonly NAME: string = 'settlepool'

    public readonly inner: Event

    public readonly poolid: string
    public readonly resolutionPrice: PricefeedPoint
    public readonly controlPrice: PricefeedPoint

    constructor(
        poolid: string,
        resolutionPrice: PricefeedPoint,
        controlPrice: PricefeedPoint,
        inner: Event
    ) {
        super(SettlePoolEvent.NAME)

        this.poolid = poolid
        this.resolutionPrice = resolutionPrice
        this.controlPrice = controlPrice
        this.inner = inner
    }
}


