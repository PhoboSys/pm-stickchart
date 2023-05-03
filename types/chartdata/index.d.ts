export * from './types';
import { ChartData, PlotData, PricePoint } from './types';
export declare class DataBuilder {
    static isEqual(start: PricePoint, end: PricePoint): boolean;
    static getLatestPrice(chartdata: {
        timestamps: any;
        prices: any;
    }): string;
    static getLatestTS(chartdata: {
        timestamps: any;
        prices: any;
    }): number;
    static getLatest(chartdata: {
        timestamps: any;
        prices: any;
    }): PricePoint;
    static EMPTY_PLOTDATA: PlotData;
    static chartdata(chartdata: ChartData): {
        timestamps: any;
        prices: any;
    };
    static framedata(chartdata: {
        timestamps: any;
        prices: any;
    }, timeframe: {
        since: any;
        until: any;
    }): {
        prices: any;
        timestamps: any;
    };
    static plotdata(framedata: {
        timestamps: any;
        prices: any;
    }, timeframe: {
        since: any;
        until: any;
    }, priceframe: {
        since: any;
        until: any;
    }, screen: {
        width: any;
        height: any;
    }): PlotData;
}
