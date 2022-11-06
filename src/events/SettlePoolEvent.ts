import { PricefeedPoint } from '../chartdata'

export class SettlePoolEvent extends Event {
    public static readonly NAME: string = 'settlepool'

    public readonly inner: Event

    public readonly pool: object
    public readonly resolutionPrice: PricefeedPoint
    public readonly controlPrice: PricefeedPoint

    constructor(
        pool: object,
        resolutionPrice: PricefeedPoint,
        controlPrice: PricefeedPoint,
        inner: Event
    ) {
        super(SettlePoolEvent.NAME)

        this.pool = pool
        this.resolutionPrice = resolutionPrice
        this.controlPrice = controlPrice
        this.inner = inner
    }
}


