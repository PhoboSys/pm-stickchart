import { Duration } from 'moment';
import { IRawPricePoint, IStick } from '../interfaces';
export declare const rawToSticksDataMapper: (data: IRawPricePoint[], interval: Duration) => IStick[];
export declare const rawNewToSticksDataMapper: (sticks: IStick[], raw: IRawPricePoint, interval: Duration) => IStick[];
export declare const sticksToValuesDataMapper: (stick: IStick) => number[];
