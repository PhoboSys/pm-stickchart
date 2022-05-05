import Big from 'big.js'

// eslint-disable-next-line @typescript-eslint/naming-convention
export default class datamath {

    static min(data: number[]): number {
        let [minimum] = data
        for (const item of data) {
            if (item < minimum) minimum = item
        }

        return minimum
    }

    static max(data: number[]): number {
        let [maximum] = data
        for (const item of data) {
            if (item > maximum) maximum = item
        }

        return maximum
    }

    static minmax(data: number[]): [number, number] {
        let [minimum] = data
        let [maximum] = data
        for (const item of data) {
            if (item < minimum) minimum = item
            if (item > maximum) maximum = item
        }

        return [minimum, maximum]
    }

    static scale(
        data: number[],
        [min, max]: [number, number],
        factor = 1,
        reversed = false,
    ): number[] {
        const scalesize = max - min
        const result: number[] = []
        for (const item of data) {
            const offset = item - min

            const scale = offset / scalesize

            result.push((reversed ? 1 - scale : scale)  * factor)
        }

        return result
    }

    static range(
        data: number[],
        minpadd = 0,
        maxpadd = 0,
    ): [number, number] {

        const [minv, maxv] = datamath.minmax(data)

        const min = new Big(minv)
        const max = new Big(maxv)
        const diff = max.minus(min)
        const mipadd = diff.times(minpadd)
        const mapadd = diff.times(maxpadd)

        return [
            min.minus(mipadd).toNumber(),
            max.plus(mapadd).toNumber(),
        ]
    }

    static datastep(
        [minv, maxv]: [number, number],
    ): number {
        const min = new Big(minv)
        const max = new Big(maxv)
        const diff = max.minus(min)

        if (diff.eq(0)) return 0

        const step = diff.round(-diff.e, Big.roundUp).div(10)

        return step
    }

    static roundpow2(value: number): number {
        value--
        value |= value >> 1
        value |= value >> 2
        value |= value >> 4
        value |= value >> 8
        value |= value >> 16
        value++

        return value
    }

    static precision(value: number, significant: number): number {

        const v = new Big(value)

        return v.prec(significant).toNumber()
    }

    static toFixedPrecision(value: number, significant: number): string {

        const v = datamath.precision(value, significant)
        if (v % 1) {
            return v.toString().padEnd(significant+1, '0')
        }

        const more = significant - v.toString().length
        if (more > 0) {
            return v.toFixed(more)
        }

        return v.toFixed(0)
    }

    static toFixedScaled(value: number, stepsize: number): string {

        const step = new Big(stepsize)

        return datamath.toFixed(value, -step.e)
    }

    static toFixed(value: number, dp: number): string {

        const v = new Big(value)

        return v.toFixed(Math.max(dp, 0))
    }

    static steps(
        [minv, maxv]: [number, number],
        stepsize: number,
        maxsteps: number,
    ): number[] {

        if (!stepsize) return [minv]

        const min = new Big(minv)
        const max = new Big(maxv)
        const diff = max.minus(min)

        const startMin = min.minus(min.mod(stepsize))

        const result: number[] = []

        const amount = diff.div(stepsize)

        let sample = 1
        if (amount.gt(maxsteps)) {
            sample = amount.div(maxsteps).round(0, Big.roundUp)
        }

        let cur = startMin
        let idx = 0

        result.push(startMin.toNumber())
        while (max.gt(cur)) {
            cur = cur.plus(stepsize)
            if (!(idx % sample)) result.push(cur.toNumber())
            idx++
        }

        return result
    }

    static sample(
        data: number[],
        density: number,
    ): number[] {

        const amount = new Big(data.length)

        if (amount.lte(density)) return data

        const result: number[] = []

        const sample = amount.div(density).round(0, Big.roundUp).toNumber()
        let idx = 0
        const lastIdx = data.length-1
        while (idx <= lastIdx) {
            if (!(idx % sample)) result.push(data[idx])
            idx++
        }

        return result
    }

    static returnPrize(args: {
        positiveFund: number,
        negativeFund: number,
        wager: number,
        position: string,
        resolution: string,
        precision: number,
    }) {
        const {
            positiveFund,
            negativeFund,
            wager,
            position,
            resolution,
            precision,
        } = args

        let prize = 0
        const win = resolution === position
        const neutral = resolution === 'NEU'

        if (neutral) prize = wager

        if (win && position === 'POS') {
            prize = datamath.dividends(
                positiveFund,
                negativeFund,
                wager
            )
        }

        if (win && position === 'NEG') {
            prize = datamath.dividends(
                negativeFund,
                positiveFund,
                wager
            )
        }

        const result = new Big(prize)

        return result.round(precision, Big.roundDown).toNumber()
    }

    static dividends(
        pool1v: number,
        pool2v: number,
        wagerv: number,
        vigorishv = 0.01
    ) {

        const pool1 = new Big(pool1v)
        const pool2 = new Big(pool2v)
        const wager = new Big(wagerv)
        const vigorish = new Big(vigorishv)

        if (pool1.eq(0)) return 0
        if (pool2.eq(0)) return wager

        const totalfund = pool1.plus(pool2)
        const result = totalfund.times(wager.div(pool1))
        const commision = result.times(vigorish)

        return result
            .minus(commision)
            .toNumber() || 0
    }

    static profitPercent(
        wagerv: number,
        basev: number,
        precision: number,
        multiplicator = 100
    ) {
        const wager = new Big(wagerv)
        const base = new Big(basev)

        return wager
            .div(base)
            .times(multiplicator)
            .minus(multiplicator)
            .round(precision, Big.roundDown)
            .toNumber() || 0
    }

}
