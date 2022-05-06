export * from './types';
import { ChartData, PlotData } from './types';
export declare class DataConverter {
    static fromPath(path: {
        0: number[];
    }): {
        xs: number[];
        ys: number[];
    };
    static toPath(plotdata: PlotData): SVGPathElement;
    static normalize(xorig: any, yorig: any, screen: {
        width: any;
        height: any;
    }): PlotData;
    static convert(chartdata: ChartData, screen: {
        width: any;
        height: any;
    }): PlotData;
}
