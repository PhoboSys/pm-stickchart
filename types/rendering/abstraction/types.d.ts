import { PlotData } from '../../chartdata';
import { Rectangle } from '../../lib/pixi';
import { ITextureStorage } from './interfaces';
import { EChartType, ERenderMode } from '../../enums';
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
    renderMode: ERenderMode;
    eventTarget: EventTarget;
    rerender?: boolean;
};
