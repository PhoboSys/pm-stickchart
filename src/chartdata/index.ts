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

    static getSecondLatest(
        chartdata: { timestamps, prices },
    ): PricePoint {
        const { timestamps, prices } = chartdata

        return {
            value: prices.at(-2),
            timestamp: Number(timestamps.at(-2)),
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

    static normalize(
        timestampsOrig,
        pricesOrig,
        chartdata: { timestamps, prices },
        timeframe: { since, until },
        screen: { width, height },
    ): PlotData {
        if (isEmpty(timestampsOrig) || isEmpty(pricesOrig)) return DataBuilder.EMPTY_PLOTDATA

        const idxs = datamath.sampler(timestampsOrig, config.maxdensity)
        const timestamps = datamath.pick(timestampsOrig, idxs)
        const prices = datamath.pick(pricesOrig, idxs)
        const { width, height } = screen

        // return latest price if sampled out
        if (
            timestamps.at(-1) !== timestampsOrig.at(-1) ||
            prices.at(-1) !== pricesOrig.at(-1)
        ) {
            timestamps.push(Number(timestampsOrig.at(-1)))
            prices.push(Number(pricesOrig.at(-1)))
        }

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
            prices,
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

    static chartdata(
        chartdata: ChartData
    ): { timestamps, prices } {
        const timestamps = Object.keys(chartdata).map(k => Number(k))
        const prices = Object.values(chartdata)

        return { timestamps, prices }
    }

    static plotdata(
        chartdata: { timestamps, prices },
        screen: { width, height },
        timeframe: { since, until },
    ): PlotData {

        const tsframed: number[] = []
        const psframed: number[] = []

        const { timestamps, prices } = chartdata
        const { since, until } = timeframe
        for (const idx in timestamps) {

            const ts = timestamps[idx]
            const ps = prices[idx]

            if (
                ts >= since &&
                ts <= until
            ) {

                tsframed.push(ts)
                psframed.push(ps)

            }
        }

        return DataBuilder.normalize(tsframed, psframed, chartdata, timeframe, screen)
    }

}
