export * from './types';
import { ChartData, DataPadding } from './types';
export declare class DataConverter {
    static readonly xpadding: DataPadding;
    static readonly ypadding: DataPadding;
    static convert(chartdata: ChartData): {
        xlast: number;
        ylast: number;
        xdata: number[];
        ydata: number[];
        xrange: [number, number];
        yrange: [number, number];
    };
}
