export type ChartData = {
    [key: number]: number
}

export type PricePoint = {
    price: number,
    timestamp: number,
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

    paddingX: [number, number],
    paddingY: [number, number],

    xs: number[],
    ys: number[],
}
