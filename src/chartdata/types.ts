import { DEFAULT_THEME, TOURNAMENT_THEME } from '@constants'

export type ChartData = {
    [key: number]: string
}

export type ChartTheme = typeof DEFAULT_THEME | typeof TOURNAMENT_THEME

export type PricePoint = {
    value: string,
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
    latestY: number,
    latestX: number,
    latest: PricePoint,

    timestamps: number[],
    prices: number[],

    timerange: [number, number],
    pricerange: [number, number],

    paddingX: [number, number],
    paddingY: [number, number],

    xs: number[],
    ys: number[],
}

export type Bettor = {
    avatarUrl: string,
}
