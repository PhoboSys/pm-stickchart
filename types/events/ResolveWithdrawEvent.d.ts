import { PricefeedPoint } from '@chartdata';
export declare class ResolveWithdrawEvent extends Event {
    static readonly NAME: string;
    readonly inner: Event;
    readonly roundid: string;
    readonly predictionid: string;
    readonly erc20: string;
    readonly exitPrice: PricefeedPoint;
    readonly controlPrice: PricefeedPoint;
    constructor(roundid: string, predictionid: string, erc20: string, exitPrice: PricefeedPoint, controlPrice: PricefeedPoint, inner: Event);
}
