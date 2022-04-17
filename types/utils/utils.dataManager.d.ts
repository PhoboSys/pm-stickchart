import { DateRange } from '.';
export declare class DataManager<T, RawDataType> {
    private dataMapper;
    private newRawDataMapper;
    private dateMapper;
    data: T[];
    constructor(rawData: RawDataType[], dataMapper: (raw: RawDataType[]) => T[], //TODO mapper
    newRawDataMapper: (data: T[], newRaw: RawDataType) => T[], dateMapper: (data: T) => number);
    get length(): number;
    get isEmpty(): boolean;
    selectByDateRange(dateRange: DateRange): T[];
    at<CurrentType>(index: number): CurrentType | undefined;
    addData(raw: RawDataType): void;
}
