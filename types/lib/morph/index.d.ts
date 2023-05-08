import { Priceframe } from '../priceframe';
import { Chartdata } from '../chartdata';
type ChartData = {
    prices: string[];
    timestamps: number[];
};
type PriceFrame = {
    since: number;
    until: number;
};
export default class MorphController {
    private chartdata;
    private priceframe;
    private _onUpdate;
    pointsTimeline: gsap.core.Timeline;
    priceframeTimeline: gsap.core.Timeline;
    constructor(chartdata: Chartdata, priceframe: Priceframe, _onUpdate: () => void);
    morph(nextChartdata: ChartData, nextPriceframe: PriceFrame, defaultUpdate: () => void): void;
    private getFrontPoints;
    terminatePointsTimeline(): void;
    private performNewPoints;
    private addPoint;
    terminatePriceframeTimeline(): void;
    private performPriceframe;
    private addPriceframe;
}
export {};
