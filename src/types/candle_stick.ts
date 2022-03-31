import { Moment } from 'moment'

import { IStickChart } from './stick_chart'

export interface ICandleStick {
    low: number,
    high: number,
    open: number,
    close: number,
    time: Moment,

    stickChart: IStickChart
}
