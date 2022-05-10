export * from './types';
import { ChartData, PlotData, DataPoint } from './types';
export declare class DataBuilder {
    static isEqual(start: DataPoint, end: DataPoint): boolean;
    static getLatest(plotdata: PlotData): DataPoint;
    static fromPolyline(polyline: SVGPolylineElement): {
        xs: any;
        ys: any;
    };
    static toPolyline(plotdata: PlotData): SVGPolylineElement;
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
