export * from './types'

import config from '@config'

import datamath from '@lib/datamath'
import { isEmpty } from '@lib/utils'
import { eq } from '@lib/calc-utils'

import { ChartData, PlotData, PricePoint } from './types'

export class DataBuilder {

    static isEqual(
        start: PricePoint,
        end: PricePoint,
    ): boolean {
        return (
            start.timestamp === end.timestamp &&
            eq(start.value, end.value)
        )
    }

    static getLatestPrice(
        chartdata: { timestamps, prices },
    ): string {
        return chartdata.prices.at(-1)
    }

    static getLatestTS(
        chartdata: { timestamps, prices },
    ): number {
        return Number(chartdata.timestamps.at(-1))
    }

    static getLatest(
        chartdata: { timestamps, prices },
    ): PricePoint {
        const { timestamps, prices } = chartdata

        return {
            value: prices.at(-1),
            timestamp: Number(timestamps.at(-1)),
        }
    }

    static EMPTY_PLOTDATA: PlotData = {
        latestY: 0,
        latestX: 0,
        latest: { value: '0', timestamp: 0 },

        timestamps: [],
        prices: [],

        timerange: [0, 0],
        pricerange: [0, 0],

        paddingX: [0, 0],
        paddingY: [0, 0],

        xs: [],
        ys: [],
    }

    static chartdata(
        chartdata: ChartData
    ): { timestamps, prices } {
        const timestamps = Object.keys(chartdata).map(k => Number(k))
        const prices = Object.values(chartdata)

        return { timestamps, prices }
    }

    static framedata(
        chartdata: { timestamps, prices },
        timeframe: { since, until },
    ): { prices, timestamps } {

        const tsframed: number[] = []
        const psframed: number[] = []

        const { timestamps: timestampsOrig, prices: pricesOrig } = chartdata
        const { since, until } = timeframe
        for (const idx in timestampsOrig) {

            const ts = timestampsOrig[idx]
            const ps = pricesOrig[idx]

            if (
                ts >= since &&
                ts <= until
            ) {

                tsframed.push(ts)
                psframed.push(ps)

            }
        }

        const idxs = datamath.sampler(tsframed, config.maxdensity)
        const timestamps = datamath.pick(tsframed, idxs)
        const prices = datamath.pick(psframed, idxs)

        // return latest price if sampled out
        if (
            timestamps.at(-1) !== tsframed.at(-1) ||
            prices.at(-1) !== psframed.at(-1)
        ) {
            timestamps.push(Number(tsframed.at(-1)))
            prices.push(Number(psframed.at(-1)))
        }

        return {
            timestamps,
            prices
        }
    }

    static plotdata(
        chartdata: { timestamps, prices },
        framedata: { timestamps, prices },
        timeframe: { since, until },
        priceframe: { since, until },
        screen: { width, height },
    ): PlotData {
        const { timestamps, prices } = framedata

        if (isEmpty(timestamps) || isEmpty(prices)) return DataBuilder.EMPTY_PLOTDATA

        const { width, height } = screen

        const paddingLeft = config.padding.left / width
        const paddingRight = config.padding.right / width
        const timerange = datamath.range(
            [timeframe.since, timeframe.until],
            paddingLeft,
            paddingRight,
        )

        const unheight = height - (config.padding.top + config.padding.bottom)
        const paddingBottom = config.padding.bottom / unheight
        const paddingTop = config.padding.top / unheight
        const pricerange = datamath.range(
            [priceframe.since, priceframe.until],
            paddingBottom,
            paddingTop,
        )

        const xs = datamath.scale(timestamps, timerange, width)
        const ys = datamath.scaleReverse(prices, pricerange, height)

        const paddingY: [number, number] = [
            config.padding.top,
            height - config.padding.bottom
        ]

        const paddingX: [number, number] = [
            config.padding.left,
            width - config.padding.right
        ]

        const latest = DataBuilder.getLatest(chartdata)
        const [latestX] = datamath.scale([latest.timestamp], timerange, width)
        const [latestY] = datamath.scaleReverse([Number(latest.value)], pricerange, height)

        return {
            latestY,
            latestX,
            latest,

            timestamps,
            prices,

            timerange,
            pricerange,

            paddingX,
            paddingY,

            xs,
            ys,
        }

    }

}
