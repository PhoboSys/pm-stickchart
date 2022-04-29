export * from './types';
import { ChartData } from './types';
export declare class DataConverter {
    static convert(chartdata: ChartData): {
        xlast: number;
        ylast: number;
        xdata: number[];
        ydata: number[];
        xrange: [number, number];
        yrange: [number, number];
    };
}
