import { ChartData, PricePoint } from '@chartdata';
import { GetSet } from '../utils';
type Prices = string[];
type Timestamps = number[];
export declare class Chartdata {
    prices: Prices;
    timestamps: Timestamps;
    get(): {
        prices: Prices;
        timestamps: Timestamps;
    };
    set({ prices, timestamps }: {
        prices: Prices;
        timestamps: Timestamps;
    }): Chartdata;
    isInitialized(): boolean;
    calculate(chartdataOrig: ChartData): GetSet<{
        prices: Prices;
        timestamps: Timestamps;
    }>;
    updatePoint(point: PricePoint, index: number): this;
}
export {};
