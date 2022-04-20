import { Rectangle } from '../../lib/pixi';
export declare type ChartData = {
    [key: number]: number;
};
export declare type DoneFunction = () => void;
export declare type RenderingContext = {
    pool: any;
    chartdata: ChartData;
    screen: Rectangle;
};
