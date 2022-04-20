export * from './types'

import config from '../config'

import { ChartData, DataPadding, PlotData } from './types'
import datamath from '../lib/datamath'

export class DataConverter {

    static readonly xpadding: DataPadding = {
        min: config.padding.left,
        max: config.padding.right,
    }
    static readonly ypadding: DataPadding = {
        min: config.padding.bottom,
        max: config.padding.top,
    }

    static convert(chartdata: ChartData) {
        const xdata = Object.keys(chartdata).map(k => Number(k))
        const ydata = Object.values(chartdata)

        const xrange = datamath.range(
            xdata,
            DataConverter.xpadding.min,
            DataConverter.xpadding.max,
        )
        const yrange = datamath.range(
            ydata,
            DataConverter.ypadding.min,
            DataConverter.ypadding.max
        )

        return {
            xdata,
            ydata,

            xrange,
            yrange,
        }
    }

}
