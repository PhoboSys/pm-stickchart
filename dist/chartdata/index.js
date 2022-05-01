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
class DataConverter {
    static convert(chartdata) {
        const xorig = Object.keys(chartdata).map(k => Number(k));
        const yorig = Object.values(chartdata);
        const xlast = Number(xorig.at(-1));
        const ylast = Number(yorig.at(-1));
        const xdata = datamath_1.default.sample(xorig, config_1.default.maxdensity);
        const ydata = datamath_1.default.sample(yorig, config_1.default.maxdensity);
        // return latest price if sampled out
        if (xdata.at(-1) !== xorig.at(-1) ||
            ydata.at(-1) !== yorig.at(-1)) {
            xdata.push(xlast);
            ydata.push(ylast);
        }
        const xrange = datamath_1.default.range(xdata, config_1.default.padding.left, config_1.default.padding.right);
        const yrange = datamath_1.default.range(ydata, config_1.default.padding.bottom, config_1.default.padding.top);
        return {
            xlast,
            ylast,
            xdata,
            ydata,
            xrange,
            yrange,
        };
    }
}
exports.DataConverter = DataConverter;
//# sourceMappingURL=index.js.map