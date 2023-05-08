import { ChartData } from '@chartdata';
import { EChartType } from '@enums';
export declare class StickChart extends EventTarget {
    private stageElement;
    private application;
    private eventsProducer;
    private pipelineFactory;
    private textureStorage;
    private morphController;
    private _context;
    private timeframe;
    private priceframe;
    private framedata;
    private chartdata;
    constructor(stageElement: HTMLElement);
    setScreenSize({ width, height }: {
        width: any;
        height: any;
    }): void;
    setTimeframe(timeframe: number): void;
    get canvas(): HTMLCanvasElement;
    private applyTimeframe;
    private applyMorph;
    rerender(reason: string): void;
    render(context: {
        chartdata: ChartData;
        charttype: EChartType;
        metapool: any;
        pools: any[];
        paris: any[];
        resolved: any[];
        settlements: any;
        blocksLatest: any;
        transactions: any;
        blocksEntities: any;
        transactionsEntities: any;
    }): void;
    destroy(): void;
}
