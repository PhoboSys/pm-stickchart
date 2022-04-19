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

    static percent(
        data: number[],
        [minv, maxv]: [number, number]
    ): number[] {
        const scalesize = maxv - minv
        const result: number[] = []
        for (const item of data) {
            const offset = item - minv
            result.push(offset / scalesize)
        }
        return result
    }

    static range(
        data: number[],
        minpadd: number = 0.1,
        maxpadd: number = 0.1
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

    static steps(
        [minv, maxv]: [number, number],
        step?: number
    ): number[] {

        step = step || datamath.datastep([minv, maxv])
        if (!step) return [minv]

        const min = new Big(minv)
        const max = new Big(maxv)

        const startMin = min.minus(min.mod(step))

        const result: number[] = []

        let cur = startMin
        result.push(startMin.toNumber())
        while (max.gt(cur)) {
            cur = cur.plus(step)
            result.push(cur.toNumber())
        }

        return result
    }

}
