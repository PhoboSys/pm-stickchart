import { ValueRange } from './utils.range'

export class DataManager<T, RawDataType> {
    public data: T[]

    public valueRange: ValueRange

    constructor(
        data: RawDataType[],
        private rawDataMapper: ((raw: RawDataType[]) => T[]),
        private rawNewDataMapper: ((data: T[], raw: RawDataType) => T[]),
        private valuesDataMapper: ((data: T) => number[]),
    ) {
        this.data = rawDataMapper(data)

        this.valueRange = this.createValueRange()
    }

    private get values(): number[] {
        return this.data
            .map(this.valuesDataMapper)
            .reduce((a, v) => [...a, ...v], [])
    }

    private createValueRange(): ValueRange {
        const { values } = this

        if (values.length < 1) return new ValueRange(0, 0)

        const min = Math.min(...values)
        const max = Math.max(...values)

        return new ValueRange(min, max)
    }

    private updateValueRange(data: T): void {
        const values = this.valuesDataMapper(data)

        values.forEach(value => this.valueRange.updateIf(value))
    }

    public addData(raw: RawDataType): void {
        this.data = this.rawNewDataMapper(this.data, raw)

        this.updateValueRange(this.data.at(-1)!)
    }
}
