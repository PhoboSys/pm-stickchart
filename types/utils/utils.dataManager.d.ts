import { ValueRange } from './utils.range';
export declare class DataManager<T, RawDataType> {
    private rawDataMapper;
    private rawNewDataMapper;
    private valuesDataMapper;
    data: T[];
    valueRange: ValueRange;
    constructor(data: RawDataType[], rawDataMapper: ((raw: RawDataType[]) => T[]), rawNewDataMapper: ((data: T[], raw: RawDataType) => T[]), valuesDataMapper: ((data: T) => number[]));
    private get values();
    private createValueRange;
    private updateValueRange;
    addData(raw: RawDataType): void;
}
