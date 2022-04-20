export * from './types';
import { ChartData, DataPadding } from './types';
export declare class DataConverter {
    static readonly xpadding: DataPadding;
    static readonly ypadding: DataPadding;
    static convert(chartdata: ChartData): {
        xdata: number[];
        ydata: number[];
        xrange: [number, number];
        yrange: [number, number];
    };
}
