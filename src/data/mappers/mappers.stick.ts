import { Duration } from 'moment'

import { unixTimestampToDate, unixTimestampToMilliseconds } from '../../utils'
import { IRawPricePoint, IStick } from '../interfaces'

export const rawToSticksDataMapper = (data: IRawPricePoint[], interval: number): IStick[] => {
    const candleSticks: IStick[] = []

    for (let i = 0; i < data.length; i++) {
        const point = data[i]

        let high = point.answer
        let low = point.answer

        i++
        while (i < data.length) {
            const current = data[i]

            const currentInterval = current.blockTimestamp * 1000 - point.blockTimestamp * 1000

            if (currentInterval > interval) break

            high = Math.max(current.answer, high)
            low = Math.min(current.answer, low)

            i++
        }

        i--

        const last = data[i]

        candleSticks.push({
            low,
            high,
            open: point.answer,
            close: last.answer,
            date: unixTimestampToDate(point.blockTimestamp),
        })
    }

    return candleSticks
}

export const rawNewToSticksDataMapper = (sticks: IStick[], raw: IRawPricePoint, interval: number): IStick[] => {
    if (!sticks.length) return rawToSticksDataMapper([raw], interval)

    const { blockTimestamp, answer } = raw
    const lastStick = sticks.at(-1)!

    const millSinceLastStick = unixTimestampToMilliseconds(blockTimestamp) - lastStick.date.valueOf()

    if (millSinceLastStick > interval) {
        const stick: IStick = {
            low: answer,
            high: answer,
            open: answer,
            close: answer,
            date: unixTimestampToDate(blockTimestamp),
        }

        return [...sticks, stick]
    }

    lastStick.close = answer
    lastStick.high = Math.max(lastStick.high, answer)
    lastStick.low = Math.min(lastStick.low, answer)

    return sticks
}

export const sticksToPricesDataMapper = (stick: IStick): number[] => {
    return [stick.high, stick.low]
}
