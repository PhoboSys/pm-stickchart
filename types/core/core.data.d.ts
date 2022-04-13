import { IPricestamp } from '../interfaces';
export declare class ChartData {
    rawPricestamps: IPricestamp[];
    constructor(rawPricestamps: IPricestamp[]);
    clone(): ChartData;
}
