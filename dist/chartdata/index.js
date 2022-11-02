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
const config_1 = __importDefault(require("../config"));
const datamath_1 = __importDefault(require("../lib/datamath"));
class DataBuilder {
    static isEqual(start, end) {
        return (start.timestamp === end.timestamp &&
            start.value === end.value);
    }
    static getLatest(plotdata, back = 1) {
        const { prices, timestamps } = plotdata;
        return {
            value: Number(prices.at(-1 * back)),
            timestamp: Number(timestamps.at(-1 * back)),
        };
    }
    static fromPolyline(polyline) {
        const all = polyline.getAttributeNS(null, 'points');
        const xs = [];
        const ys = [];
        const points = all === null || all === void 0 ? void 0 : all.split(' ');
        for (const point of points) {
            const [x, y] = point.split(',');
            xs.push(Number(x));
            ys.push(Number(y));
        }
        return { xs, ys };
    }
    static toPolyline(plotdata) {
        const { xs, ys } = plotdata;
        const result = [];
        for (const idx in xs) {
            result.push(xs[idx] + ',' + ys[idx]);
        }
        const points = result.join(' ');
        const ns = 'http://www.w3.org/2000/svg';
        const polyline = document.createElementNS(ns, 'polyline');
        polyline.setAttributeNS(null, 'points', points);
        return polyline;
    }
    static normalize(timestampsOrig, pricesOrig, screen) {
        const timestamps = datamath_1.default.sample(timestampsOrig, config_1.default.maxdensity);
        const prices = datamath_1.default.sample(pricesOrig, config_1.default.maxdensity);
        // return latest price if sampled out
        if (timestamps.at(-1) !== timestampsOrig.at(-1) ||
            prices.at(-1) !== pricesOrig.at(-1)) {
            timestamps.push(Number(timestampsOrig.at(-1)));
            prices.push(Number(pricesOrig.at(-1)));
        }
        const timerange = datamath_1.default.range(timestamps, config_1.default.padding.left, config_1.default.padding.right);
        const pricerange = datamath_1.default.range(prices, config_1.default.padding.bottom, config_1.default.padding.top);
        const { width, height } = screen;
        const xs = datamath_1.default.scale(timestamps, timerange, width);
        const ys = datamath_1.default.scaleReverse(prices, pricerange, height);
        const unpheight = height / (1 + config_1.default.padding.top + config_1.default.padding.bottom);
        const paddingY = [
            unpheight * config_1.default.padding.top,
            unpheight * (1 + config_1.default.padding.bottom)
        ];
        const unpwidth = width / (1 + config_1.default.padding.left + config_1.default.padding.right);
        const paddingX = [
            unpwidth * config_1.default.padding.left,
            unpwidth * (1 + config_1.default.padding.right)
        ];
        return {
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
            if (ts >= since) {
                tsframed.push(ts);
                psframed.push(ps);
            }
        }
        return DataBuilder.normalize(tsframed, psframed, screen);
    }
}
exports.DataBuilder = DataBuilder;
//# sourceMappingURL=index.js.map