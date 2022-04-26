import { ChartData } from './chartdata';
import { EChartType } from './enums';
export declare class StickChart extends EventTarget {
    private stageElement;
    private chartType;
    private application;
    private eventsProducer;
    private pipelineFactory;
    private textureStorage;
    constructor(stageElement: HTMLElement, chartType: EChartType);
    get canvas(): HTMLCanvasElement;
    render(context: {
        chartdata: ChartData;
        charttype: EChartType;
        pari: any;
        pool: any;
        mousepos: any;
    }): void;
    destroy(): void;
}
