export declare type ChartData = {
    [key: number]: number;
};
export declare type DataPoint = {
    price: number;
    timestamp: number;
};
export declare type DataPadding = {
    min: number;
    max: number;
};
export declare type PlotData = {
    timestamps: number[];
    prices: number[];
    timerange: [number, number];
    pricerange: [number, number];
    xs: number[];
    ys: number[];
};
