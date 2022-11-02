import Big from 'big.js'
import { PRIZEFUNDS } from '../../constants/positions'
import { mapValues } from '../../lib/utils'

const ONE = Big(1)
const ZERO = Big(0)

const VIGORISH = Big(0.01)

function __inNotZeroNumbers(...args) {
  for (let num of args) {
    if (!Number(num)) return false
  }
  return true
}

function __futureReturn(prizefunds, wager) {
  if (!__inNotZeroNumbers(prizefunds[PRIZEFUNDS.TOTAL], wager)) return mapValues(prizefunds, () => ZERO)

  wager = Big(wager)
  prizefunds = mapValues(prizefunds, prizefund => Big(prizefund))

  const result = { }
  for (const position in prizefunds) {

    result[position] = wager.plus(prizefunds[PRIZEFUNDS.TOTAL])
      .times(
        wager.div(
          wager.plus(prizefunds[position])
        )
      )
      .times(
        ONE.minus(VIGORISH)
      )

  }

  return result
}

export function futureReturn(prizefunds, wager) {
  return mapValues(__futureReturn(prizefunds, wager), ret => ret.toString())
}

export function futureProfit(prizefunds, wager) {
  return mapValues(__futureReturn(prizefunds, wager), ret => ret.minus(wager).toString())
}

export function futureProfitPercent(prizefunds, wager) {
  if (!__inNotZeroNumbers(prizefunds[PRIZEFUNDS.TOTAL], wager)) return mapValues(prizefunds, () => ZERO.toString())

  wager = Big(wager)
  return mapValues(__futureReturn(prizefunds, wager), ret => ret.div(wager).minus(1).toString())
}


function __actualReturn(prizefunds, wager, position) {
  if (!__inNotZeroNumbers(prizefunds[PRIZEFUNDS.TOTAL], position, wager)) return ZERO

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

export function actualProfit(prizefunds, wager, position) {
  const result = __actualReturn(prizefunds, wager, position)

  return result.minus(wager).toString()
}

export function actualProfitPercent(prizefunds, wager, position) {
  if (!__inNotZeroNumbers(prizefunds[PRIZEFUNDS.TOTAL], wager, position)) return ZERO.toString()

  const result = __actualReturn(prizefunds, wager, position)

  wager = Big(wager)
  return result.div(wager).minus(1).toString()
}
