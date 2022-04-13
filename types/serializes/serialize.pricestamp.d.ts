import { IPricestamp } from '../interfaces/interface.pricestamp';
import { IRawPricestamp } from '../interfaces/interface.rawPricestamp';
export declare const serializeSinglePricestamp: (data: IRawPricestamp) => IPricestamp;
export declare const serializePricestamps: (data: IRawPricestamp[]) => IPricestamp[];
