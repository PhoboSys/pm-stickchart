import { PlotData } from '@chartdata';
import { Rectangle } from '../../lib/pixi';
import { ITextureStorage } from './interfaces';
import { EChartType } from '@enums';
export type DoneFunction = () => void;
export type RenderingContext = {
    metapool: any;
    pools: any[];
    paris: any[];
    resolved: any[];
    settlements: any;
    transactions: any;
    latestBlockNumber: number;
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
};
