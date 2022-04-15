export class DataManager<T, RawDataType> {
    public data: T[]

    constructor(
        rawData: RawDataType[],
        private dataMapper: (raw: RawDataType[]) => T[], //TODO mapper
        private newRawDataMapper: (data: T[], newRaw: RawDataType) => T[],
    ) {
        this.data = dataMapper(rawData)
    }

    public get isEmpty(): boolean {
        return !this.data.length
    }

    public addData(raw: RawDataType): void {
        this.data = this.newRawDataMapper(this.data, raw)
    }
}
