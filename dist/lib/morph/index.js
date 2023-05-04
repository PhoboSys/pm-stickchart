"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _config_1 = __importDefault(require("../../config.js"));
const pixi_1 = require("../pixi");
const calc_utils_1 = require("../calc-utils");
class MorphController {
    constructor(timeframe, priceframe, framedata, _onUpdate) {
        this.timeframe = timeframe;
        this.priceframe = priceframe;
        this.framedata = framedata;
        this._onUpdate = _onUpdate;
        this.pointsTimeline = pixi_1.gsap.timeline();
        this.priceframeTimeline = pixi_1.gsap.timeline();
    }
    morph(currentTimeframe, currentChartData, currentPriceframe) {
        const previousChartData = this.framedata.get();
        const previousPriceframe = this.priceframe.get();
        if (!previousChartData || !currentChartData || !previousPriceframe || !currentPriceframe || !_config_1.default.morph)
            return;
        // 0. Make sure to complite running animations and clear timeline
        this.terminatePointsTimeline();
        this.terminatePriceframeTimeline();
        // 1. Find all points that was added from previous to current
        const { indeces, intersect, animations } = this.getFrontPoints(previousChartData, currentChartData);
        // 3. If any intersaction found and animations are in valid range perform animations
        const shouldAnimate = animations <= _config_1.default.morph.maxstack && animations > 0;
        if (intersect && shouldAnimate) {
            this.performNewPoints(currentChartData, indeces, animations);
            this.performPriceframe(previousPriceframe, currentPriceframe);
            // 5. retrun in order to avoid defaul update/render if morph preformed
            return;
        }
        // 4. Perform default update/render
        this.timeframe.now(currentTimeframe.until);
        this.framedata.set(currentChartData);
        this.priceframe.set(currentPriceframe);
        this._onUpdate();
    }
    getFrontPoints(previous, current) {
        const frontdiff = [];
        const pts = previous.timestamps[previous.timestamps.length - 1];
        let cidx = current.timestamps.length;
        let intersect = false;
        while (!intersect && cidx-- && pts) {
            const cts = current.timestamps[cidx];
            intersect = cts === pts;
            frontdiff.unshift(cidx);
        }
        return {
            indeces: frontdiff,
            intersect,
            animations: frontdiff.length ? frontdiff.length - 1 : 0,
        };
    }
    terminatePointsTimeline() {
        if (this.pointsTimeline.isActive())
            this.pointsTimeline.progress(1);
        this.pointsTimeline.clear();
    }
    performNewPoints(chartdata, pointsIndeces, animations) {
        let prevpoint = null;
        for (const idx of pointsIndeces) {
            const target = {
                timestamp: chartdata.timestamps[idx],
                value: chartdata.prices[idx],
            };
            if (prevpoint) {
                this.addPoint(prevpoint, target);
            }
            prevpoint = target;
        }
        // Speedup animation to make all timeline finish in config.morph.duration
        this.pointsTimeline.timeScale(animations);
        return;
    }
    addPoint(animated, end) {
        const updateFramedata = this.framedata.createUpdater();
        this.pointsTimeline.to(animated, Object.assign(Object.assign(Object.assign({}, end), _config_1.default.morph.animation), { onUpdate: () => {
                const timeframe = this.timeframe.now(animated.timestamp).get();
                updateFramedata(animated, timeframe);
                this._onUpdate();
            }, onComplete: () => {
                // gsap has limited precision
                // in order to render exactly 'end'
                // we have to apply it explicitly
                const timeframe = this.timeframe.now(end.timestamp).get();
                updateFramedata(end, timeframe);
                this._onUpdate();
            } }));
    }
    terminatePriceframeTimeline() {
        if (this.priceframeTimeline) {
            if (this.priceframeTimeline.isActive())
                this.priceframeTimeline.progress(1);
            this.priceframeTimeline.clear();
        }
    }
    performPriceframe(previous, current) {
        if ((0, calc_utils_1.eq)(previous.since, current.since) && (0, calc_utils_1.eq)(previous.until, current.until))
            return;
        this.addPriceframe(Object.assign({}, previous), current);
    }
    addPriceframe(animated, end) {
        this.priceframeTimeline.to(animated, Object.assign(Object.assign(Object.assign({}, end), _config_1.default.morph.animation), { onUpdate: () => {
                this.priceframe.set({ since: animated.since, until: animated.until });
                this._onUpdate();
            }, onComplete: () => {
                // gsap has limited precision
                // in order to render exactly 'end'
                // we have to apply it explicitly
                this.priceframe.set({ since: end.since, until: end.until });
                this._onUpdate();
            } }));
    }
}
exports.default = MorphController;
//# sourceMappingURL=index.js.map