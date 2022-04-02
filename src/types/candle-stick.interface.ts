import { Moment } from 'moment'

export interface ICandleStick {
    low: number,
    high: number,
    open: number,
    close: number,
    time: Moment,
}
