import { Duration } from 'moment';
import { ChartTypes } from '../enums/enum.chartTypes';
import { IStick } from '../interfaces';
import { IPricePoint } from '../interfaces/interface.pricePoint';
import { IRawPricePoint } from '../interfaces/interface.rawPricePoint';
declare type PricePointMapper = (data: IRawPricePoint[]) => IPricePoint[];
declare type StickMapper = (data: IRawPricePoint[], interval: Duration) => IStick[];
export declare const rawDataMappersMap: {
    [key in ChartTypes]: PricePointMapper | StickMapper;
};
export {};
