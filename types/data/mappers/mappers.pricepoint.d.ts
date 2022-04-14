import { IRawPricePoint, IPricePoint } from '../interfaces';
export declare const pricePointsToValuesDataMapper: (pricePoints: IPricePoint) => number[];
export declare const singleRawToPricePointDataMapper: (data: IRawPricePoint) => IPricePoint;
export declare const rawNewToPricePointsDataMapper: (pricePoints: IPricePoint[], raw: IRawPricePoint) => IPricePoint[];
export declare const rawToPricePointsDataMapper: (data: IRawPricePoint[]) => IPricePoint[];
