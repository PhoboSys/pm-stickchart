export * from './types'

import config from '../config'

import datamath from '../lib/datamath'
import { MorphSVGPlugin } from '../lib/pixi'

import { ChartData, PlotData } from './types'

export class DataConverter {

    static fromPath(path: { 0: number[] }) {

        const points = path[0]

        const xs: number[] = []
        const ys: number[] = []

        const length = points.length / 2
        let idx = 0
        while (idx < length) {
            let i = idx++ * 2
            xs.push(points[i++])
            ys.push(points[i++])
        }

        return { xs, ys }
    }

    static toPath(
        plotdata: PlotData
    ) {

        const { xs, ys } = plotdata

        const result: string[] = []

        for (const idx in xs) {
            result.push(xs[idx] + ',' + ys[idx])
        }

        const points = result.join(' ')

        const ns = 'http://www.w3.org/2000/svg'
        const polyline = document.createElementNS(ns, 'polyline')
        polyline.setAttributeNS(null, 'points', points)

        return MorphSVGPlugin.convertToPath(polyline)[0]

    }

    static normalize(
        xorig,
        yorig,
        screen: { width, height }
    ): PlotData {

        const xdata = datamath.sample(xorig, config.maxdensity)
        const ydata = datamath.sample(yorig, config.maxdensity)

        // return latest price if sampled out
        if (
            xdata.at(-1) !== xorig.at(-1) ||
            ydata.at(-1) !== yorig.at(-1)
        ) {
            xdata.push(Number(xorig.at(-1)))
            ydata.push(Number(yorig.at(-1)))
        }

        const xrange = datamath.range(
            xdata,
            config.padding.left,
            config.padding.right,
        )

        const yrange = datamath.range(
            ydata,
            config.padding.bottom,
            config.padding.top,
        )


        const { width, height } = screen
        const xs = datamath.scale(xdata, xrange, width)
        const ys = datamath.scaleReverse(ydata, yrange, height)

        return {
            xdata,
            ydata,

            xrange,
            yrange,

            xs,
            ys,
        }

    }

    static convert(
        chartdata: ChartData,
        screen: { width, height }
    ): PlotData {

        const xorig = Object.keys(chartdata).map(k => Number(k))
        const yorig = Object.values(chartdata)

        return DataConverter.normalize(xorig, yorig, screen)
    }

}
