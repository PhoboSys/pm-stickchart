import { Duration } from 'moment';
import { ChartTypes } from '../enums/enum.chartTypes';
import { IStick, IRawPricePoint, IPricePoint } from '../interfaces';
declare type Mapper = (data: IStick[] | IPricePoint[], raw: IRawPricePoint, interval: Duration) => IStick[] | IPricePoint[];
export declare const rawNewDataMappersMap: {
    [key in ChartTypes]: Mapper;
};
export {};
