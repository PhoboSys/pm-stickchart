import { Logger } from '@infra'

type Format = (amount: string | number) => string
type Formatter = {
    formatUnsymboled: Format
    formatSymboled: Format
    formatNamed: Format
}

const SYMBOLS = {
    'WETH': 'Ξ',
    'WBTC': '₿',
}

export class CurrencyFormatter {
    static #formatters = {}

    static DEFAULT = ''

    static formatSymboled(amount, currency, options): string {
        const formatter = CurrencyFormatter.#get(currency, options)

        return formatter.formatSymboled(amount)
    }

    static formatUnsymboled(amount, currency, options): string {
        const formatter = CurrencyFormatter.#get(currency, options)

        return formatter.formatUnsymboled(amount)
    }

    static formatNamed(amount, currency, options): string {
        const formatter = CurrencyFormatter.#get(currency, options)

        return formatter.formatNamed(amount)
    }

    static formatDefault(amount, options): string {
        const formatter = CurrencyFormatter.#get(CurrencyFormatter.DEFAULT, options)

        return formatter.formatUnsymboled(amount)
    }

    static #get(currency, options = {}): Formatter {
        const key = CurrencyFormatter.#key(currency, options)
        if (!CurrencyFormatter.#formatters[key]) {
            CurrencyFormatter.#formatters[key] = CurrencyFormatter.#create(currency, options)
        }

        return CurrencyFormatter.#formatters[key]
    }

    static #key(currency, options): string {
        return JSON.stringify({ currency, ...options })
    }

    static #create(currency, options): Formatter {
        try {
            return CurrencyFormatter.#createStandard(currency, options)
        } catch {
            return CurrencyFormatter.#createCustom(currency, options)
        }
    }

    static #createStandard(currency, options): Formatter {
        const fSymboled = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency,
            currencyDisplay: 'narrowSymbol',
            ...options,
        })

        const fCoded = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency,
            currencyDisplay: 'code',
            ...options,
        })

        const formatter = {
            formatUnsymboled: (amount): string => fCoded.format(amount).replace(new RegExp(`\s+${currency}\s+`), ''),
            formatSymboled: (amount): string => fSymboled.format(amount),
            formatNamed: (amount): string => fCoded.format(amount),
        }

        Logger.info('Standard Currency Formatter Create: "%s"', currency)

        return formatter

    }

    static #createCustom(currency, options): Formatter {
        const fDefault = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            ...options,
        })

        const formatter = {
            formatUnsymboled: (amount): string => fDefault.format(amount).replace('$', ''),
            formatSymboled: (amount): string => fDefault.format(amount).replace('$', (SYMBOLS[currency] || '')),
            formatNamed: (amount): string => [fDefault.format(amount).replace('$', ''), currency].join(' '),
        }

        Logger.info('Custom Currency Formatter Create: "%s"', currency || 'DEFAULT')

        return formatter

    }

}

