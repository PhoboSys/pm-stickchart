export class ValueRange {
    constructor(
        private from: number,
        private to: number,
    ) { }

    public get value(): number {
        return this.to - this.from
    }

    public inRange(point: number): boolean {
        return this.from > point && point < this.to
    }

    public getPointByValue(value: number): number {
        return (value - this.from) / this.value
    }

    public getIntervalsCount(interval: number): number {
        return this.value / interval
    }

    public clone(): ValueRange {
        return new ValueRange(this.from, this.to)
    }

    public toString(): string {
        return `Range(from: ${this.from}, to: ${this.to})`
    }
}
