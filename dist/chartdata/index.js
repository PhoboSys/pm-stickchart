"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBuilder = void 0;
__exportStar(require("./types"), exports);
const _config_1 = __importDefault(require("../config.js"));
const datamath_1 = __importDefault(require("../lib/datamath"));
const utils_1 = require("../lib/utils");
class DataBuilder {
    static isEqual(start, end) {
        return (start.timestamp === end.timestamp &&
            start.value === end.value);
    }
    static getLatestPrice(chartdata) {
        return Number(chartdata.prices.at(-1));
    }
    static getLatestTS(chartdata) {
        return Number(chartdata.timestamps.at(-1));
    }
    static getLatest(chartdata) {
        const { timestamps, prices } = chartdata;
        return {
            value: Number(prices.at(-1)),
            timestamp: Number(timestamps.at(-1)),
        };
    }
    static normalize(timestampsOrig, pricesOrig, chartdata, timeframe, screen) {
        if ((0, utils_1.isEmpty)(timestampsOrig) || (0, utils_1.isEmpty)(pricesOrig))
            return DataBuilder.EMPTY_PLOTDATA;
        const idxs = datamath_1.default.sampler(timestampsOrig, _config_1.default.maxdensity);
        const timestamps = datamath_1.default.pick(timestampsOrig, idxs);
        const prices = datamath_1.default.pick(pricesOrig, idxs);
        const { width, height } = screen;
        // return latest price if sampled out
        if (timestamps.at(-1) !== timestampsOrig.at(-1) ||
            prices.at(-1) !== pricesOrig.at(-1)) {
            timestamps.push(Number(timestampsOrig.at(-1)));
            prices.push(Number(pricesOrig.at(-1)));
        }
        const paddingLeft = _config_1.default.padding.left / width;
        const paddingRight = _config_1.default.padding.right / width;
        const timerange = datamath_1.default.range([timeframe.since, timeframe.until], paddingLeft, paddingRight);
        const unheight = height - (_config_1.default.padding.top + _config_1.default.padding.bottom);
        const paddingBottom = _config_1.default.padding.bottom / unheight;
        const paddingTop = _config_1.default.padding.top / unheight;
        const pricerange = datamath_1.default.range(prices, paddingBottom, paddingTop);
        const xs = datamath_1.default.scale(timestamps, timerange, width);
        const ys = datamath_1.default.scaleReverse(prices, pricerange, height);
        const paddingY = [
            _config_1.default.padding.top,
            height - _config_1.default.padding.bottom
        ];
        const paddingX = [
            _config_1.default.padding.left,
            width - _config_1.default.padding.right
        ];
        const latest = DataBuilder.getLatest(chartdata);
        const [latestX] = datamath_1.default.scale([latest.timestamp], timerange, width);
        const [latestY] = datamath_1.default.scaleReverse([latest.value], pricerange, height);
        return {
            latestY,
            latestX,
            latest,
            timestamps,
            prices,
            timerange,
            pricerange,
            paddingX,
            paddingY,
            xs,
            ys,
        };
    }
    static chartdata(chartdata) {
        const timestamps = Object.keys(chartdata).map(k => Number(k));
        const prices = Object.values(chartdata);
        return { timestamps, prices };
    }
    static plotdata(chartdata, screen, timeframe) {
        const tsframed = [];
        const psframed = [];
        const { timestamps, prices } = chartdata;
        const { since, until } = timeframe;
        for (const idx in timestamps) {
            const ts = timestamps[idx];
            const ps = prices[idx];
            if (ts >= since &&
                ts <= until) {
                tsframed.push(ts);
                psframed.push(ps);
            }
        }
        return DataBuilder.normalize(tsframed, psframed, chartdata, timeframe, screen);
    }
}
exports.DataBuilder = DataBuilder;
DataBuilder.EMPTY_PLOTDATA = {
    latestY: 0,
    latestX: 0,
    latest: { value: 0, timestamp: 0 },
    timestamps: [],
    prices: [],
    timerange: [0, 0],
    pricerange: [0, 0],
    paddingX: [0, 0],
    paddingY: [0, 0],
    xs: [],
    ys: [],
};
//# sourceMappingURL=index.js.map