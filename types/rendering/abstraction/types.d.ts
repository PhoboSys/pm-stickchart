import { Rectangle } from '../../lib/pixi';
import { ChartData, PlotData } from '../../chartdata';
export declare type DoneFunction = () => void;
export declare type RenderingContext = {
    pool: any;
    chartdata: ChartData;
    plotdata: PlotData;
    screen: Rectangle;
};
