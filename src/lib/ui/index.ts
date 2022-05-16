import config from '../../config'
import { USD } from '../../constants/currencies'
import datamath from '../datamath'

// eslint-disable-next-line @typescript-eslint/naming-convention
export default class ui {

    static currency(price, currently): string {
        const symbols = {
            [USD]: '$'
        }

        let symb = symbols[currently] || ''
        if (!config.price.showSymbols) symb = ''

        return symb + datamath.toFixedPrecision(price,  config.price.precision)
    }

    static currencyScaled(price, currently, scale: number,): string {
        const symbols = {
            [USD]: '$'
        }

        let symb = symbols[currently] || ''
        if (!config.price.showSymbols) symb = ''

        return symb + datamath.toFixedScaled(price, scale)
    }
}
