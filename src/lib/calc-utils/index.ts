import Big from 'big.js'
import { PRIZEFUNDS } from '@constants'
import { mapValues } from '@lib/utils'

const ONE = Big(1)
const ZERO = Big(0)

const VIGORISH = Big(0.01)

function __inNotZeroNumbers(...args) {
    for (const num of args) {
        if (!Number(num)) return false
    }

    return true
}

function __futureReturn(prizefunds, wager, position) {
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

export function futureReturn(prizefunds, wager, position) {
    const result = __futureReturn(prizefunds, wager, position)

    return result.toString()
}

function __actualReturn(prizefunds, wager, position) {
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

export function actualReturn(prizefunds, wager, position) {
    const result = __actualReturn(prizefunds, wager, position)

    return result.toString()
}

export function profitPercent(prize, wager) {
    if (!__inNotZeroNumbers(prize, wager)) return ZERO.toString()

    prize = Big(prize)
    wager = Big(wager)

    return prize.div(wager).minus(1).toString()
}
