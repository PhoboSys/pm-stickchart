import { PricePoint } from '@chartdata';
type Prices = string[];
type Timestamps = number[];
type FrameData = {
    prices: Prices;
    timestamps: Timestamps;
};
export declare class Framedata {
    private prices;
    private timestamps;
    get(): FrameData;
    set({ prices, timestamps }: FrameData): Framedata;
    isInitialized(): boolean;
    calculate(chartdata: {
        timestamps: any;
        prices: any;
    }, timeframe: {
        since: any;
        until: any;
    }): FrameData;
    createUpdater(): (animated: PricePoint, timeframe: {
        since: number;
        until: number;
    }) => this;
}
export {};
