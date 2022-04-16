import { EmittedEvent } from '../data/aliases/aliases.emittedEvent';
import { ChartTypes, InputEventTypes } from '../data/enums';
import { IRawPricePoint } from '../data/interfaces';
import { IStickChartOptions } from '../data/interfaces/interface.stickChart';
export declare class StickChart {
    private middlewareRunner;
    private viewport;
    private application;
    private state;
    private initConfig;
    constructor(options: IStickChartOptions);
    get view(): HTMLCanvasElement;
    private registerInitConfig;
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
