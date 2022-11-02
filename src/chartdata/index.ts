export * from './types'

import config from '../config'

import datamath from '../lib/datamath'

import { ChartData, PlotData, PricePoint } from './types'

export class DataBuilder {

    static isEqual(
        start: PricePoint,
        end: PricePoint,
    ): boolean {
        return (
            start.timestamp === end.timestamp &&
            start.value === end.value
        )
    }

    static getLatest(
        plotdata: PlotData,
        back: number = 1
    ): PricePoint {

        const { prices, timestamps } = plotdata

        return {
            value: Number(prices.at(-1*back)),
            timestamp: Number(timestamps.at(-1*back)),
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

        const unpheight = height / (1 + config.padding.top + config.padding.bottom)
        const paddingY: [number, number] = [
            unpheight * config.padding.top,
            unpheight * (1 + config.padding.bottom)
        ]

        const unpwidth = width / (1 + config.padding.left + config.padding.right)
        const paddingX: [number, number] = [
            unpwidth * config.padding.left,
            unpwidth * (1 + config.padding.right)
        ]

        return {
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

            if (ts >= since) {

                tsframed.push(ts)
                psframed.push(ps)

            }
        }

        return DataBuilder.normalize(tsframed, psframed, screen)
    }

}
