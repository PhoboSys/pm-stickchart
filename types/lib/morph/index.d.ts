import { Priceframe } from '../priceframe';
import { Timeframe } from '../timeframe';
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
    private _onUpdate;
    private pointsTimeline;
    priceframeTimeline: gsap.core.Timeline;
    constructor(timeframe: Timeframe, priceframe: Priceframe, _onUpdate: () => void);
    morph(previousChartData: ChartData, currentChartData: ChartData, previousPriceframe: PriceFrame, currentPriceframe: PriceFrame): void;
    private getFrontPoints;
    private terminatePointsTimeline;
    private performNewPoints;
    private addPoint;
    terminatePriceframeTimeline(): void;
    private performPriceframe;
    private addPriceframe;
}
export {};
