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
        factor: number = 1,
    ): number[] {

        const scalesize = max - min
        const result: number[] = []

        for (const item of data) {
            const offset = item - min

            result.push(offset / scalesize * factor)
        }

        return result
    }

    static scaleReverse(
        data: number[],
        [min, max]: [number, number],
        factor: number = 1,
    ): number[] {

        const scalesize = max - min
        const result: number[] = []

        for (const item of data) {
            const offset = item - min

            result.push((1 - offset / scalesize) * factor)
        }

        return result
    }

    static range(
        data: number[],
        minpadd: number = 0,
        maxpadd: number = 0,
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

        return step.toNumber()
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

    static percent(value: number, significant: number): number {
        const v = new Big(value)

        return v.times(100).round(significant, Big.roundDown).toNumber()
    }

    static round(value: number, significant: number): number {
        const v = new Big(value)

        return v.round(significant, Big.roundDown).toNumber()
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

    static fashhash(value: number): number {
        return Math.floor(Math.sin(value) * 100_000_000)
    }

    static sampler(
        data: number[],
        density: number,
    ): number[] {

        const amount = data.length
        const result: number[] = []

        if (amount <= density) {
            let idx = 0
            const lastIdx = data.length-1
            while (idx <= lastIdx) {
                result.push(idx)
                idx++
            }
        } else {
            const sample = datamath.roundpow2(Math.ceil(amount / density))
            let idx = 0
            const lastIdx = data.length-1
            while (idx <= lastIdx) {
                const hash = datamath.fashhash(data[idx])
                if (!(hash % sample)) result.push(idx)
                idx++
            }
        }

        return result
    }

    static pick(
        data: number[],
        keys: number[],
    ): number[] {

        const result: number[] = []

        let idx = 0
        const lastIdx = keys.length-1
        while (idx <= lastIdx) {
            const key = keys[idx]
            if (key in data) result.push(data[key])
            idx++
        }

        return result
    }
}
