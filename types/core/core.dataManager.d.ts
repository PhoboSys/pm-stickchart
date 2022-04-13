import { Peek } from '../utils/utils.peek';
export declare class DataManager<T> {
    data: T[];
    private valuesDataMapper;
    valuePeek: Peek<number> | undefined;
    constructor(data: T[], valuesDataMapper: ((data: T) => number[]));
    private createValuePeek;
    addNext(data: T): void;
}
