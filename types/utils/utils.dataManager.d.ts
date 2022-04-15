export declare class DataManager<T, RawDataType> {
    private dataMapper;
    private newRawDataMapper;
    data: T[];
    constructor(rawData: RawDataType[], dataMapper: (raw: RawDataType[]) => T[], //TODO mapper
    newRawDataMapper: (data: T[], newRaw: RawDataType) => T[]);
    get isEmpty(): boolean;
    addData(raw: RawDataType): void;
}
