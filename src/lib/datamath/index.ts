import Big from 'big.js'

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
        factor: number = 1
    ): number[] {
        const scalesize = max - min
        const result: number[] = []
        for (const item of data) {
            const offset = item - min
            result.push(offset / scalesize * factor)
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
            max.plus(mapadd).toNumber()
        ]
    }

    static datastep(
        [minv, maxv]: [number, number]
    ): number {
        const min = new Big(minv)
        const max = new Big(maxv)
        const diff = max.minus(min)

        if (diff.eq(0)) return 0

        const step = diff.round(-diff.e, Big.roundUp).div(10)

        return step
    }

    static roundpow2(value: number) {
        value--
        value |= value >> 1
        value |= value >> 2
        value |= value >> 4
        value |= value >> 8
        value |= value >> 16
        value++
        return value
    }

    static stepsize(
        [minv, maxv]: [number, number],
        stepscount: number
    ) {
        return (maxv - minv) / stepscount
    }

    static steps(
        [minv, maxv]: [number, number],
        stepsize: number,
        maxsteps?: number,
    ): number[] {

        if (!stepsize) return [minv]

        const min = new Big(minv)
        const max = new Big(maxv)
        const diff = max.minus(min)

        // const startMin = min.minus(min.mod(stepsize))

        const result: number[] = []

        const amount = diff.div(stepsize)

        let sample = 1
        if (maxsteps && amount.gt(maxsteps)) {
            sample = amount.div(maxsteps).round(0, Big.roundUp)
        }

        let cur = min
        let idx = 0
        result.push(min.toNumber())
        while (max.gt(cur)) {
            cur = cur.plus(stepsize)
            if (!(idx % sample)) result.push(cur.toNumber())
            idx++
        }

        return result
    }

}
