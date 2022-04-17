import { EmittedEvent } from '../data/aliases/aliases.emittedEvent';
import { ChartTypes, InputEventTypes } from '../data/enums';
import { OutputEventTypes } from '../data/enums/enum.outputEventTypes';
import { IRawPricePoint } from '../data/interfaces';
import { IStickChartOptions } from '../data/interfaces/interface.stickChart';
import { EventEmitter } from './core.eventEmitter';
export declare class StickChart extends EventEmitter<OutputEventTypes> {
    private middlewareRunner;
    private viewport;
    private application;
    private state;
    private options;
    constructor(options: Partial<IStickChartOptions>);
    get view(): HTMLCanvasElement;
    private createApplication;
    private createState;
    private createBasicConfig;
    private createRenderConfig;
    private createDataManager;
    private createViewport;
    create(): StickChart;
    render(): StickChart;
    setChartType(type: ChartTypes): StickChart;
    addData(rawPricePoint: IRawPricePoint): StickChart;
    addInputEventHandler(event: EmittedEvent, type: InputEventTypes): void;
    private throwIfStateNotCreated;
}
