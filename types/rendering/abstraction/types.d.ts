import { ChartData, PlotData } from '../../chartdata';
import { Application, Rectangle } from '../../lib/pixi';
import { ITextureStorage } from './interfaces';
export declare type DoneFunction = () => void;
export declare type RenderingContext = {
    pool: any;
    paris: any[];
    chartdata: ChartData;
    plotdata: PlotData;
    screen: Rectangle;
    textures: ITextureStorage;
    application: Application;
    mousepos?: {
        x: number;
        y: number;
    };
};
