import { ChartData, PlotData } from '../../chartdata';
import { Rectangle } from '../../lib/pixi';
import { ITextureStorage } from './interfaces';
export declare type DoneFunction = () => void;
export declare type RenderingContext = {
    pool: any;
    chartdata: ChartData;
    plotdata: PlotData;
    screen: Rectangle;
    textures: ITextureStorage;
    mousepos?: {
        x: number;
        y: number;
    };
};
