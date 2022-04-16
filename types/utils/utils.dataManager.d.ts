export declare class DataManager<T, RawDataType> {
    private dataMapper;
    private newRawDataMapper;
    data: T[];
    constructor(rawData: RawDataType[], dataMapper: (raw: RawDataType[]) => T[], //TODO mapper
    newRawDataMapper: (data: T[], newRaw: RawDataType) => T[]);
    get length(): number;
    get isEmpty(): boolean;
    at<CurrentType>(index: number): CurrentType | undefined;
    addData(raw: RawDataType): void;
}
