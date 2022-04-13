import { Duration } from 'moment';
import { IStick } from '../../../../types/interfaces/interface.stick';
import { IRawPricePoint } from '../../interfaces';
export declare const rawToSticksDataMapper: (data: IRawPricePoint[], interval: Duration) => IStick[];
