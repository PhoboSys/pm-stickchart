export * from './types'

import config from '../config'

import datamath from '../lib/datamath'

import { ChartData, DataPadding, PlotData } from './types'

export class DataConverter {

    static readonly xpadding: DataPadding = {
        min: config.padding.left,
        max: config.padding.right,
    }

    static readonly ypadding: DataPadding = {
        min: config.padding.bottom,
        max: config.padding.top,
    }

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
            DataConverter.xpadding.min,
            DataConverter.xpadding.max,
        )
        const yrange = datamath.range(
            ydata,
            DataConverter.ypadding.min,
            DataConverter.ypadding.max,
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
