export type ChartData = {
    [key: number]: number
}

export type DataPadding = {
    min: number,
    max: number
}

export type PlotData = {
    timestamps: number[],
    prices: number[],

    timerange: [number, number],
    pricerange: [number, number],

    xs: number[],
    ys: number[],
}
