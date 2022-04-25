import { Rectangle, RenderTexture } from '../../lib/pixi';
import { ChartData, PlotData } from '../../chartdata';
export declare type DoneFunction = () => void;
export declare type RenderingContext = {
    pool: any;
    chartdata: ChartData;
    plotdata: PlotData;
    screen: Rectangle;
    gradient: RenderTexture;
    mousepos?: {
        x: number;
        y: number;
    };
};
