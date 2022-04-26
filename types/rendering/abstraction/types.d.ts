<<<<<<< HEAD
import { Rectangle } from '../../lib/pixi';
import { ChartData, PlotData } from '../../chartdata';
import { ITextureStorage } from './interfaces';
=======
import { ChartData, PlotData } from '../../chartdata';
import { Rectangle, RenderTexture } from '../../lib/pixi';
>>>>>>> 5d8a960 (eslint fix)
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
