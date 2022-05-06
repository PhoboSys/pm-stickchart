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
exports.DataConverter = void 0;
__exportStar(require("./types"), exports);
const config_1 = __importDefault(require("../config"));
const datamath_1 = __importDefault(require("../lib/datamath"));
const pixi_1 = require("../lib/pixi");
class DataConverter {
    static fromPath(path) {
        const points = path[0];
        const xs = [];
        const ys = [];
        const length = points.length / 2;
        let idx = 0;
        while (idx < length) {
            let i = idx++ * 2;
            xs.push(points[i++]);
            ys.push(points[i++]);
        }
        return { xs, ys };
    }
    static toPath(plotdata) {
        const { xs, ys, yrange } = plotdata;
        const result = [];
        for (const idx in xs) {
            result.push(xs[idx] + ',' + ys[idx]);
        }
        const points = result.join(' ');
        const ns = 'http://www.w3.org/2000/svg';
        const polyline = document.createElementNS(ns, 'polyline');
        polyline.setAttributeNS(null, 'points', points);
        return pixi_1.MorphSVGPlugin.convertToPath(polyline)[0];
    }
    static normalize(xorig, yorig, screen) {
        const xdata = datamath_1.default.sample(xorig, config_1.default.maxdensity);
        const ydata = datamath_1.default.sample(yorig, config_1.default.maxdensity);
        // return latest price if sampled out
        if (xdata.at(-1) !== xorig.at(-1) ||
            ydata.at(-1) !== yorig.at(-1)) {
            xdata.push(Number(xorig.at(-1)));
            ydata.push(Number(yorig.at(-1)));
        }
        const xrange = datamath_1.default.range(xdata, config_1.default.padding.left, config_1.default.padding.right);
        const yrange = datamath_1.default.range(ydata, config_1.default.padding.bottom, config_1.default.padding.top);
        const { width, height } = screen;
        const xs = datamath_1.default.scale(xdata, xrange, width);
        const ys = datamath_1.default.scaleReverse(ydata, yrange, height);
        return {
            xdata,
            ydata,
            xrange,
            yrange,
            xs,
            ys,
        };
    }
    static convert(chartdata, screen) {
        const xorig = Object.keys(chartdata).map(k => Number(k));
        const yorig = Object.values(chartdata);
        return DataConverter.normalize(xorig, yorig, screen);
    }
}
exports.DataConverter = DataConverter;
//# sourceMappingURL=index.js.map