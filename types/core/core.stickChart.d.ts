import { Duration } from 'moment';
import { EmittedEvent } from '../data/aliases/aliases.emittedEvent';
import { ChartTypes, InputEventTypes } from '../data/enums';
import { IStickChartStyle, IRawPricePoint } from '../data/interfaces';
import { DateRange } from '../utils';
export declare class StickChart {
    private width;
    private height;
    private chartType;
    private stickIntervalSize;
    private columnIntervalSize;
    private dateRange;
    private style;
    private data;
    private middlewareRunner;
    private viewport;
    private state;
    private viewConfig;
    private application;
    constructor(width: number, height: number, chartType: ChartTypes, stickIntervalSize: Duration, columnIntervalSize?: Duration, dateRange?: DateRange, style?: IStickChartStyle, data?: IRawPricePoint[]);
    get view(): HTMLCanvasElement;
    private createViewConfig;
    private createDataManager;
    private createState;
    private createViewport;
    create(): void;
    render(): void;
    setChartType(type: ChartTypes): void;
    inputData(rawPricePoint: IRawPricePoint): void;
    addInputEventHandler(event: EmittedEvent, type: InputEventTypes): void;
    private throwIfNotCreatedState;
}
