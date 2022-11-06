import { PricefeedPoint } from '../chartdata';
export declare class SettlePoolEvent extends Event {
    static readonly NAME: string;
    readonly inner: Event;
    readonly pool: object;
    readonly resolutionPrice: PricefeedPoint;
    readonly controlPrice: PricefeedPoint;
    constructor(pool: object, resolutionPrice: PricefeedPoint, controlPrice: PricefeedPoint, inner: Event);
}
