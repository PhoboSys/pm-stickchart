export * from './types';
import { ChartData, PlotData } from './types';
export declare class DataConverter {
    static getLatest(plotdata: PlotData): {
        price: any;
        timestamp: any;
    };
    static fromPolyline(polyline: SVGPolylineElement): {
        xs: any;
        ys: any;
    };
    static toPolyline(plotdata: PlotData): SVGPolylineElement;
    static fromPath(path: {
        0: number[];
    }): {
        xs: number[];
        ys: number[];
    };
    static toPath(plotdata: PlotData): SVGPathElement;
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
    }, timeframe: number): PlotData;
}
