import { ChartData } from './chartdata';
import { EChartType } from './enums';
export declare class StickChart extends EventTarget {
    private stageElement;
    private application;
    private eventsProducer;
    private pipelineFactory;
    private textureStorage;
    private morphController;
    private _context;
    private timeframe;
    constructor(stageElement: HTMLElement);
    setScreenSize({ width, height }: {
        width: any;
        height: any;
    }): void;
    setTimeframe(timeframe: number): void;
    get canvas(): HTMLCanvasElement;
    private applyTimeframe;
    private applyLatestPoint;
    rerender(reason: string): void;
    render(context: {
        chartdata: ChartData;
        charttype: EChartType;
        paris: any[];
        resolved: any[];
        pool: any;
    }): void;
    destroy(): void;
}
