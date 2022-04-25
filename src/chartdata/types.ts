export type ChartData = {
    [key: number]: number
}

export type DataPadding = {
    min: number,
    max: number
}

export type PlotData = {
    xlast: number,
    ylast: number,

    xdata: number[],
    ydata: number[],

    xrange: [number, number],
    yrange: [number, number],
}
