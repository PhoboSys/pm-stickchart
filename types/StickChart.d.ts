import { ChartData, Bettor } from '@chartdata';
import { EChartType } from '@enums';
import { Features } from '@features';
import { Options } from '@options';
export declare class StickChart extends EventTarget {
    private stageElement;
    private options?;
    private application;
    private eventsProducer;
    private pipelineFactory;
    private textureStorage;
    private morphController;
    private _context;
    private timeframe;
    private fontsready;
    private statedata;
    constructor(stageElement: HTMLElement, options?: Options | undefined);
    setScreenSize({ width, height }: {
        width: any;
        height: any;
    }): void;
    setTimeframe(timeframe: number): void;
    resetTimeframe(): void;
    get canvas(): HTMLCanvasElement;
    private applyTimeframe;
    private applyMorph;
    rerender(reason: string): void;
    render(context: {
        chartdata: ChartData;
        charttype: EChartType;
        game: any;
        pools: any[];
        paris: any[];
        resolved: any[];
        settlements: any;
        blocksLatest: any;
        transactions: any;
        blocksEntities: any;
        transactionsEntities: any;
        bettor: Bettor;
        features: Features;
    }): void;
    destroy(): void;
}
