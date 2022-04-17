import { EChartType, InputEventTypes as EInputEvent } from '../data/enums';
import { EmittedEvent } from '../data/aliases/aliases.emittedEvent';
import { IRawPricePoint } from '../data/interfaces';
export declare class StickChart {
    private stageElement;
    private chartType;
    private middlewareRunner;
    private logger;
    private viewport;
    private state;
    private viewConfig;
    private application;
    private style;
    private data;
    private dateRange;
    constructor(stageElement: HTMLInputElement, chartType: EChartType);
    get canvas(): HTMLCanvasElement;
    private createDataManager;
    render(data?: any, type?: any): void;
    setChartType(type: EChartType): void;
    inputData(rawPricePoint: IRawPricePoint): void;
    addInputEventHandler(event: EmittedEvent, type: EInputEvent): void;
}
