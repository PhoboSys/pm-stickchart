import config from '../../config'
import { USD } from '../../constants'
import datamath from '../datamath'
import { unixTStoDate } from '../utils'

export const UNIX_MINUTE = 60
export const UNIX_HOUR = 60 * UNIX_MINUTE
export const UNIX_DAY = 24 * UNIX_HOUR
export const UNIX_WEEK = 7 * UNIX_DAY

// eslint-disable-next-line @typescript-eslint/naming-convention
export default class ui {

    static percent(amount): string {
        if (!amount) return ''

        let s = '+'
        if (amount < 0) s = ''

        return s + datamath.percent(amount, config.ui.precision.percent) + '%'
    }

    static erc20(amount): string {
        if (!amount) return '0'

        return datamath.round(amount, config.ui.precision.erc20).toString()
    }

    static currency(price, currently = ''): string {
        let symb = ''
        if (currently && config.price.showSymbols) {
            const symbols = {
                [USD]: '$'
            }
            symb = symbols[currently]
        }

        return symb + datamath.toFixedPrecision(price, config.price.precision)
    }

    static currencyScaled(price, currently, scale: number): string {
        const symbols = {
            [USD]: '$'
        }

        let symb = symbols[currently] || ''
        if (!config.price.showSymbols) symb = ''

        return symb + datamath.toFixedScaled(price, scale)
    }

    static time24(timestamp: number): string {
        const date = unixTStoDate(timestamp)

        const hh = date.getHours()
        const mm = date.getMinutes().toString().padStart(2, '0')

        return `${hh || '00'}:${mm}`
    }

    static duration24(duration: number): string {

        const ss = Math.floor(duration) % 60
        const mm = Math.floor(duration / UNIX_MINUTE) % 60
        const hh = Math.floor(duration / UNIX_HOUR) % 60
        const dd = Math.floor(duration / UNIX_DAY) % 24

        let pritty: any[] = []
        // remove prepending zeros
        for (let part of [dd, hh, mm, ss]) {
            if (pritty.length) pritty.push(part.toFixed().padStart(2, '0'))
            else if (part) pritty.push(part)
        }

        return pritty.join(':') || '0'
    }
}
