export class ValueRange {
    from: number

    to: number

    constructor(from, to) {
        this.from = from
        this.to = to
    }

    findValuePoint(value: number): number {
        if (this.from > value || this.to < value)
            throw new Error(`ValuePoint(${value}) should fit in the ${this.toString()}`)

        return (value - this.from) / this.value
    }

    getIntervalsCount(interval: number): number {
        return this.value / interval
    }

    get value(): number {
        return this.to - this.from
    }

    toString(): string {
        return `Range(from: ${this.from}, to: ${this.to})`
    }
}
