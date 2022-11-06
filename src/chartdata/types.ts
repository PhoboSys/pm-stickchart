export type ChartData = {
    [key: number]: number
}

export type PricePoint = {
    value: number,
    timestamp: number,
}

export type PricefeedPoint = {
    value: number,
    timestamp: number,
    roundid: string,
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
