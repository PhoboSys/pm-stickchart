import Big from 'big.js'
import { PRIZEFUNDS } from '../../constants/positions'
import { mapValues } from '../../lib/utils'

const ONE = Big(1)
const ZERO = Big(0)

function __inNotZeroNumbers(...args) {
  for (let num of args) {
    if (!Number(num)) return false
  }
  return true
}

function __futureReturn(prizefunds, wager, vigorish = 0.01) {
  if (!__inNotZeroNumbers(prizefunds[PRIZEFUNDS.TOTAL], wager, vigorish)) return mapValues(prizefunds, () => ZERO)

  wager = Big(wager)
  vigorish = Big(vigorish)
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
        ONE.minus(vigorish)
      )

  }

  return result
}

export function futureReturn(prizefunds, wager, vigorish = 0.01) {
  return mapValues(__futureReturn(prizefunds, wager, vigorish), ret => ret.toString())
}

export function futureProfit(prizefunds, wager, vigorish = 0.01) {
  return mapValues(__futureReturn(prizefunds, wager, vigorish), ret => ret.minus(wager).toString())
}

export function futureProfitPercent(prizefunds, wager, vigorish = 0.01) {
  if (!__inNotZeroNumbers(prizefunds[PRIZEFUNDS.TOTAL], wager, vigorish)) return mapValues(prizefunds, () => ZERO.toString())

  wager = Big(wager)
  return mapValues(__futureReturn(prizefunds, wager, vigorish), ret => ret.div(wager).minus(1).toString())
}


function __actualReturn(prizefunds, wager, position, vigorish = 0.01) {
  if (!__inNotZeroNumbers(prizefunds[PRIZEFUNDS.TOTAL], position, wager, vigorish)) return ZERO

  wager = Big(wager)
  vigorish = Big(vigorish)
  prizefunds = mapValues(prizefunds, prizefund => Big(prizefund))

  const result = prizefunds[PRIZEFUNDS.TOTAL]
    .times(
      wager.div(prizefunds[position])
    )
    .times(
      ONE.minus(vigorish)
    )

  return result
}

export function actualReturn(prizefunds, wager, position, vigorish = 0.01) {
  const result = __actualReturn(prizefunds, wager, position, vigorish)
  return result.toString()
}

export function actualProfit(prizefunds, wager, position, vigorish = 0.01) {
  const result = __actualReturn(prizefunds, wager, position, vigorish)

  return result.minus(wager).toString()
}

export function actualProfitPercent(prizefunds, wager, position, vigorish = 0.01) {
  if (!__inNotZeroNumbers(prizefunds[PRIZEFUNDS.TOTAL], wager, position, vigorish)) return ZERO.toString()

  const result = __actualReturn(prizefunds, wager, position, vigorish)

  wager = Big(wager)
  return result.div(wager).minus(1).toString()
}
