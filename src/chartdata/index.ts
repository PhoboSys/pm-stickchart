export * from './types'

import config from '../config'

import datamath from '../lib/datamath'

import { ChartData, PlotData, DataPoint } from './types'

export class DataBuilder {

    static isEqual(
        start: DataPoint,
        end: DataPoint,
    ): boolean {
        return (
            start.timestamp === end.timestamp &&
            start.price === end.price
        )
    }

    static getLatest(
        plotdata: PlotData
    ): DataPoint {

        const  { prices, timestamps } = plotdata

        return {
            price: Number(prices.at(-1)),
            timestamp: Number(timestamps.at(-1)),
        }
    }

    static fromPolyline(
        polyline: SVGPolylineElement
    ): { xs, ys } {

        const all = polyline.getAttributeNS(null, 'points')

        const xs: number[] = []
        const ys: number[] = []
        const points = <string[]>all?.split(' ')
        for (const point of points) {
            const [x, y] = point.split(',')

            xs.push(Number(x))
            ys.push(Number(y))
        }

        return { xs, ys }

    }

    static toPolyline(
        plotdata: PlotData
    ): SVGPolylineElement {

        const { xs, ys } = plotdata

        const result: string[] = []

        for (const idx in xs) {
            result.push(xs[idx] + ',' + ys[idx])
        }

        const points = result.join(' ')

        const ns = 'http://www.w3.org/2000/svg'
        const polyline = document.createElementNS(ns, 'polyline')
        polyline.setAttributeNS(null, 'points', points)

        return polyline

    }

    static normalize(
        timestampsOrig,
        pricesOrig,
        screen: { width, height },
    ): PlotData {

        const timestamps = datamath.sample(timestampsOrig, config.maxdensity)
        const prices = datamath.sample(pricesOrig, config.maxdensity)

        // return latest price if sampled out
        if (
            timestamps.at(-1) !== timestampsOrig.at(-1) ||
            prices.at(-1) !== pricesOrig.at(-1)
        ) {
            timestamps.push(Number(timestampsOrig.at(-1)))
            prices.push(Number(pricesOrig.at(-1)))
        }

        const timerange = datamath.range(
            timestamps,
            config.padding.left,
            config.padding.right,
        )

        const pricerange = datamath.range(
            prices,
            config.padding.bottom,
            config.padding.top,
        )


        const { width, height } = screen
        const xs = datamath.scale(timestamps, timerange, width)
        const ys = datamath.scaleReverse(prices, pricerange, height)

        return {
            timestamps,
            prices,

            timerange,
            pricerange,

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

            if (ts >= since) {

                tsframed.push(ts)
                psframed.push(ps)

            }
        }

        return DataBuilder.normalize(tsframed, psframed, screen)
    }

}
