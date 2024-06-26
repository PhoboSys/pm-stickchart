import { PricefeedPoint } from '@chartdata';
export declare class ResolveWithdrawEvent extends Event {
    static readonly NAME: string;
    readonly inner: Event;
    readonly roundid: string;
    readonly predictionid: string;
    readonly erc20: string;
    readonly resolutionPrice: PricefeedPoint;
    readonly controlPrice: PricefeedPoint;
    constructor(roundid: string, predictionid: string, erc20: string, resolutionPrice: PricefeedPoint, controlPrice: PricefeedPoint, inner: Event);
}
