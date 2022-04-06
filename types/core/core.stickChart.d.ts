import { Container } from '@pixi/display';
import { Duration } from 'moment';
import { IStick } from '../interfaces/interface.stick';
import { DateRange, ValueRange } from '../utils';
export declare class StickChart {
    private width;
    private height;
    private dateRange;
    private renderDateRange;
    private columnIntervalSize;
    private stickIntervalWidth;
    private valueRange;
    private rowIntervalSize;
    private renderSticks;
    private middlewareRunner;
    private viewport;
    private state;
    constructor(width: number, height: number, dateRange: DateRange, renderDateRange: DateRange, columnIntervalSize: Duration, stickIntervalWidth: Duration, valueRange: ValueRange, rowIntervalSize: number, renderSticks?: IStick[]);
    private set setEmittedEvent(value);
    private set setEmittedEventType(value);
    private createState;
    private createViewport;
    create(container: Container): void;
    render(): void;
    addStick(...stick: IStick[]): void;
    addEventHandler(type: keyof HTMLElementEventMap): (event: Event) => void;
    private throwIfNotCreatedState;
}
