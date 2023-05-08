import { GetSet } from '../utils';
type Prices = string[];
type Timestamps = number[];
export declare class Framedata {
    private prices;
    private timestamps;
    get(): {
        prices: Prices;
        timestamps: Timestamps;
    };
    set({ prices, timestamps }: {
        prices: Prices;
        timestamps: Timestamps;
    }): Framedata;
    isInitialized(): boolean;
    calculate(chartdata: {
        timestamps: any;
        prices: any;
    }, timeframe: {
        since: any;
        until: any;
    }): GetSet<{
        prices: Prices;
        timestamps: Timestamps;
    }>;
}
export {};
