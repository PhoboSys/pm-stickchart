import { IRawPricePoint, IStick } from '../interfaces';
export declare const rawToSticksDataMapper: (data: IRawPricePoint[], interval: number) => IStick[];
export declare const rawNewToSticksDataMapper: (sticks: IStick[], raw: IRawPricePoint, interval: number) => IStick[];
export declare const sticksToPricesDataMapper: (stick: IStick) => number[];
