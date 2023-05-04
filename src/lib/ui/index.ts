import Big from 'big.js'

import config from '@config'
import datamath from '@lib/datamath'
import { unixTStoDate } from '@lib/utils'
import { CurrencyFormatter } from '@lib/currency'

export const UNIX_MINUTE = 60
export const UNIX_HOUR = 60 * UNIX_MINUTE
export const UNIX_DAY = 24 * UNIX_HOUR
export const UNIX_WEEK = 7 * UNIX_DAY

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

    static currency(price, currency): string {
        const options = {
            minimumFractionDigits: config.price.minimumFractionDigits,
            maximumFractionDigits: config.price.maximumFractionDigits,
        }

        if (config.price.showSymbols) {
            return CurrencyFormatter.formatSymboled(price, currency, options)
        }

        return CurrencyFormatter.formatUnsymboled(price, currency, options)
    }

    static currencyScaled(price, currency, scale: number): string {
        const step = new Big(scale)
        const fractionDigits = Math.max(-step.e, 0)
        const options = {
            minimumFractionDigits: fractionDigits,
            maximumFractionDigits: fractionDigits,
        }

        if (config.price.showSymbols) {
            return CurrencyFormatter.formatSymboled(price, currency, options)
        }

        return CurrencyFormatter.formatUnsymboled(price, currency, options)
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

        const pritty: any[] = []
        // remove prepending zeros
        for (const part of [dd, hh, mm, ss]) {
            if (pritty.length) pritty.push(part.toFixed().padStart(2, '0'))
            else if (part) pritty.push(part)
        }

        return pritty.join(':') || '0'
    }
}
