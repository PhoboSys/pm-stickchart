export * from './types';
import { ChartData, PlotData, PricePoint } from './types';
export declare class DataBuilder {
    static isEqual(start: PricePoint, end: PricePoint): boolean;
    static getLatest(plotdata: PlotData, back?: number): PricePoint;
    static fromPolyline(polyline: SVGPolylineElement): {
        xs: any;
        ys: any;
    };
    static toPolyline(plotdata: PlotData): SVGPolylineElement;
    static EMPTY_PLOTDATA: PlotData;
    static normalize(timestampsOrig: any, pricesOrig: any, screen: {
        width: any;
        height: any;
    }): PlotData;
    static chartdata(chartdata: ChartData): {
        timestamps: any;
        prices: any;
    };
    static plotdata(chartdata: {
        timestamps: any;
        prices: any;
    }, screen: {
        width: any;
        height: any;
    }, timeframe: {
        since: any;
        until: any;
    }): PlotData;
}
