import { PlotData } from '../../chartdata';
import { Rectangle } from '../../lib/pixi';
import { ITextureStorage } from './interfaces';
import { EChartType } from '../../enums';
export declare type DoneFunction = () => void;
export declare type RenderingContext = {
    pool: any;
    paris: any[];
    resolved: any[];
    screen: Rectangle;
    textures: ITextureStorage;
    charttype: EChartType;
    plotdata: PlotData;
    chartdata: {
        prices: number[];
        timestamps: number[];
    };
    eventTarget: EventTarget;
    rerender?: boolean;
    mousepos?: {
        x: number;
        y: number;
    };
};
