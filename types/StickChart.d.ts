import { EChartType } from './enums';
import { ChartData } from './rendering';
export declare class StickChart extends EventTarget {
    private stageElement;
    private chartType;
    private renderer;
    private application;
    constructor(stageElement: HTMLInputElement, chartType: EChartType);
    get canvas(): HTMLCanvasElement;
    render(chartdata: ChartData, charttype: EChartType): void;
    destroy(): void;
}
