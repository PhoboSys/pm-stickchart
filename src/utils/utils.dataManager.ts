import { PriceRange } from './utils.range'

export class DataManager<T, RawDataType> {
    public data: T[]

    constructor(
        rawData: RawDataType[],
        private rawDataMapper: (raw: RawDataType[]) => T[], //TODO mapper
        private rawNewDataMapper: (data: T[], raw: RawDataType) => T[],
    ) {
        this.data = rawDataMapper(rawData)
    }

    public addData(raw: RawDataType): void {
        this.data = this.rawNewDataMapper(this.data, raw)
    }
}
