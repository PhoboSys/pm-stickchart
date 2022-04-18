import { ChartTypes } from '../enums/enum.chartTypes';
import { IStick } from '../interfaces';
import { IPricePoint } from '../interfaces/interface.pricePoint';
declare type PricePointMapper = (data: IPricePoint) => number[];
declare type StickMapper = (data: IStick) => number[];
export declare const dataToValueMappersMap: {
    [key in ChartTypes]: PricePointMapper | StickMapper;
};
export {};