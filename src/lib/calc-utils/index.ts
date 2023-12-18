import Big from 'big.js'
import { PRIZEFUNDS } from '@constants'
import { mapValues } from '@lib/utils'

const ONE = Big(1)
const ZERO = Big(0)

const VIGORISH = Big(0.01)

function __inNumbers(...args): boolean {
    for (const num of args) {
        if (
            num === '' ||
            isNaN(Number(num)) ||
            typeof Number(num) !== 'number'
        ) return false
    }

    return true
}

function __inNotZeroNumbers(...args): boolean {
    for (const num of args) {
        if (!Number(num)) return false
    }

    return true
}

function __futureReturn(prizefunds, wager, position): Big {
    if (!__inNotZeroNumbers(prizefunds?.[PRIZEFUNDS.TOTAL], prizefunds?.[position], wager)) return ZERO

    wager = Big(wager)
    prizefunds = mapValues(prizefunds, prizefund => Big(prizefund))

    const result = wager.plus(prizefunds[PRIZEFUNDS.TOTAL])
        .times(
            wager.div(
                wager.plus(prizefunds[position])
            )
        )
        .times(
            ONE.minus(VIGORISH)
        )

    return result
}

export function futureReturn(prizefunds, wager, position): string {
    const result = __futureReturn(prizefunds, wager, position)

    return result.toString()
}

function __actualReturn(prizefunds, wager, position): Big {
    if (!__inNotZeroNumbers(prizefunds?.[PRIZEFUNDS.TOTAL], prizefunds?.[position], wager)) return ZERO

    wager = Big(wager)
    prizefunds = mapValues(prizefunds, prizefund => Big(prizefund))

    const result = prizefunds[PRIZEFUNDS.TOTAL]
        .times(
            wager.div(prizefunds[position])
        )
        .times(
            ONE.minus(VIGORISH)
        )

    return result
}

export function actualReturn(prizefunds, wager, position): string {
    const result = __actualReturn(prizefunds, wager, position)

    return result.toString()
}

export function profitPercent(prize, wager): string {
    if (!__inNotZeroNumbers(prize, wager)) return ZERO.toString()

    prize = Big(prize)
    wager = Big(wager)

    return prize.div(wager).minus(1).toString()
}

export function gt(number1, number2): boolean {

    number1 = Big(number1)
    number2 = Big(number2)

    return number1.gt(number2)
}

export function gte(number1, number2): boolean {

    number1 = Big(number1)
    number2 = Big(number2)

    return number1.gte(number2)
}

export function eq(number1, number2): boolean {

    number1 = Big(number1)
    number2 = Big(number2)

    return number1.eq(number2)
}

export function lt(number1, number2): boolean {

    number1 = Big(number1)
    number2 = Big(number2)

    return number1.lt(number2)
}

export function lte(number1, number2): boolean {

    number1 = Big(number1)
    number2 = Big(number2)

    return number1.lte(number2)
}

export function add(number1, number2): string {
    if (!__inNumbers(number1, number2)) return '0'

    number1 = Big(number1)
    number2 = Big(number2)

    return number1
        .plus(number2)
        .toString() || 0
}

export function mul(number1, number2): string {
    if (!__inNumbers(number1, number2)) return '0'

    number1 = Big(number1)
    number2 = Big(number2)

    return number1
        .times(number2)
        .toString() || '0'
}

export function sub(number1, number2): string {
    if (!__inNumbers(number1, number2)) return '0'

    number1 = Big(number1)
    number2 = Big(number2)

    return number1
        .minus(number2)
        .toString() || '0'
}

export function div(number1, number2): string {
    if (!__inNumbers(number1, number2)) return '0'

    number1 = Big(number1)
    number2 = Big(number2)

    return number1
        .div(number2)
        .toString() || '0'
}
