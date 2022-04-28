import { EChartType } from './enums';
import { ChartData } from './chartdata';
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
        paris: any[];
        pari: any;
        pool: any;
        mousepos: any;
    }): void;
    destroy(): void;
}
