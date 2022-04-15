import { ChartTypes } from '../enums/enum.chartTypes';
import { IStick, IRawPricePoint, IPricePoint } from '../interfaces';
declare type Mapper = (data: IStick[] | IPricePoint[], raw: IRawPricePoint, interval: number) => IStick[] | IPricePoint[];
export declare const newRawDataMappersMap: {
    [key in ChartTypes]: Mapper;
};
export {};
