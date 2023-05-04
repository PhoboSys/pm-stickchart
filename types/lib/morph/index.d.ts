import { Priceframe } from '../priceframe';
import { Timeframe } from '../timeframe';
import { Framedata } from '../framedata';
type ChartData = {
    prices: string[];
    timestamps: number[];
};
type PriceFrame = {
    since: number;
    until: number;
};
export default class MorphController {
    private timeframe;
    private priceframe;
    private framedata;
    private _onUpdate;
    pointsTimeline: gsap.core.Timeline;
    priceframeTimeline: gsap.core.Timeline;
    constructor(timeframe: Timeframe, priceframe: Priceframe, framedata: Framedata, _onUpdate: () => void);
    morph(currentChartData: ChartData, currentPriceframe: PriceFrame, defaultUpdate: () => void): void;
    private getFrontPoints;
    terminatePointsTimeline(): void;
    private performNewPoints;
    private addPoint;
    terminatePriceframeTimeline(): void;
    private performPriceframe;
    private addPriceframe;
}
export {};
