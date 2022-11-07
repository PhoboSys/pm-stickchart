import { PricefeedPoint } from '../chartdata';
export declare class SettlePoolEvent extends Event {
    static readonly NAME: string;
    readonly inner: Event;
    readonly poolid: string;
    readonly resolutionPrice: PricefeedPoint;
    readonly controlPrice: PricefeedPoint;
    constructor(poolid: string, resolutionPrice: PricefeedPoint, controlPrice: PricefeedPoint, inner: Event);
}
