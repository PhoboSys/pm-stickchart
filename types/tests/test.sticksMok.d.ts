import { Duration, Moment } from 'moment';
import { IStickChart, IStick } from '../interfaces';
export declare function generateSticks({ stickIntervalWidth, valueRange }: IStickChart, whitespace: Duration, stickDateFrom: Moment, stickDateTo: Moment): IStick[];
