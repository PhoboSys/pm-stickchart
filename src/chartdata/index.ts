export * from './types'

import config from '../config'

import datamath from '../lib/datamath'

import { ChartData } from './types'

export class DataConverter {
    static convert(chartdata: ChartData): any {

        const xorig = Object.keys(chartdata).map(k => Number(k))
        const yorig = Object.values(chartdata)

        const xlast = Number(xorig.at(-1))
        const ylast = Number(yorig.at(-1))

        const xdata = datamath.sample(xorig, config.maxdensity)
        const ydata = datamath.sample(yorig, config.maxdensity)

        // return latest price if sampled out
        if (
            xdata.at(-1) !== xorig.at(-1) ||
            ydata.at(-1) !== yorig.at(-1)
        ) {
            xdata.push(xlast)
            ydata.push(ylast)
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

        return {
            xlast,
            ylast,

            xdata,
            ydata,

            xrange,
            yrange,
        }
    }

}
