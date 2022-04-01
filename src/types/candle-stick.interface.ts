import { Moment } from 'moment'

import { IStickChart } from './stick-chart.interface'

export interface ICandleStick {
    low: number,
    high: number,
    open: number,
    close: number,
    time: Moment,

    stickChart: IStickChart
}
