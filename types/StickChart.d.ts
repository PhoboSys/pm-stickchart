import { EChartType } from './enums';
import { ChartData } from './chartdata';
export declare class StickChart extends EventTarget {
    private stageElement;
    private chartType;
    private renderer;
    private application;
    constructor(stageElement: HTMLInputElement, chartType: EChartType);
    get canvas(): HTMLCanvasElement;
    render(context: {
        chartdata: ChartData;
        charttype: EChartType;
        pari: any;
        pool: any;
    }): void;
    destroy(): void;
}
