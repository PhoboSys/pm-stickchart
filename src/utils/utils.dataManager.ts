import { DateRange } from '.'

export class DataManager<T, RawDataType> {
    public data: T[]

    constructor(
        rawData: RawDataType[],
        private dataMapper: (raw: RawDataType[]) => T[], //TODO mapper
        private newRawDataMapper: (data: T[], newRaw: RawDataType) => T[],
        private dateMapper: (data: T) => number,
    ) {
        this.data = dataMapper(rawData)
    }

    public get length(): number {
        return this.data.length
    }

    public get isEmpty(): boolean {
        return !this.data.length
    }

    public selectByDateRange(dateRange: DateRange): T[] {
        const dates = this.data.map(this.dateMapper)
        const selected: T[] = []

        for (let i = 0; i < this.length; i++) {
            const hasSelected = selected.length

            if (dateRange.isContain(dates[i])) {
                if (hasSelected && i) {
                    selected.push(this.data[i - 1])
                }

                selected.push(this.data[i])
            } else if (hasSelected) {
                selected.push(this.data[i])

                break
            }
        }

        return selected
    }

    public at<CurrentType>(index: number): CurrentType | undefined {
        const { data } = this

        return <CurrentType | undefined>data.at(index)
    }

    public addData(raw: RawDataType): void {
        this.data = this.newRawDataMapper(this.data, raw)
    }
}
