"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const big_js_1 = __importDefault(require("big.js"));
const utils_1 = require("../utils");
const calc_utils_1 = require("../calc-utils");
class datamath {
    static min(data) {
        let [minimum] = data;
        for (const item of data) {
            if ((0, calc_utils_1.lt)(item, minimum))
                minimum = item;
        }
        return minimum;
    }
    static max(data) {
        let [maximum] = data;
        for (const item of data) {
            if ((0, calc_utils_1.gt)(item, maximum))
                maximum = item;
        }
        return maximum;
    }
    static minmax(data) {
        let [minimum] = data;
        let [maximum] = data;
        for (const item of data) {
            if ((0, calc_utils_1.lt)(item, minimum))
                minimum = item;
            if ((0, calc_utils_1.gt)(item, maximum))
                maximum = item;
        }
        return [minimum, maximum];
    }
    static scale(data, [min, max], factor = 1) {
        const scalesize = max - min;
        const result = [];
        for (const item of data) {
            const offset = item - min;
            result.push(offset / scalesize * factor);
        }
        return result;
    }
    static scaleReverse(data, [min, max], factor = 1) {
        const scalesize = max - min;
        const result = [];
        for (const item of data) {
            const offset = item - min;
            result.push((1 - offset / scalesize) * factor);
        }
        return result;
    }
    static range(data, minpadd = 0, maxpadd = 0) {
        const [minv, maxv] = datamath.minmax(data);
        const min = new big_js_1.default(minv);
        const max = new big_js_1.default(maxv);
        const diff = max.minus(min);
        const mipadd = diff.times(minpadd);
        const mapadd = diff.times(maxpadd);
        return [
            min.minus(mipadd).toNumber(),
            max.plus(mapadd).toNumber(),
        ];
    }
    static datastep([minv, maxv]) {
        const min = new big_js_1.default(minv);
        const max = new big_js_1.default(maxv);
        const diff = max.minus(min);
        if (diff.eq(0))
            return 0;
        const step = diff.round(-diff.e, big_js_1.default.roundUp).div(10);
        return step.toNumber();
    }
    static roundpow2(value) {
        value--;
        value |= value >> 1;
        value |= value >> 2;
        value |= value >> 4;
        value |= value >> 8;
        value |= value >> 16;
        value++;
        return value;
    }
    static percent(value, significant) {
        const v = new big_js_1.default(value);
        return v.times(100).round(significant, big_js_1.default.roundDown).toNumber();
    }
    static round(value, significant) {
        const v = new big_js_1.default(value);
        return v.round(significant, big_js_1.default.roundDown).toNumber();
    }
    static toFixed(value, dp) {
        const v = new big_js_1.default(value);
        return v.toFixed(Math.max(dp, 0));
    }
    static steps([minv, maxv], stepsize, maxsteps) {
        if (!stepsize)
            return [minv];
        const min = new big_js_1.default(minv);
        const max = new big_js_1.default(maxv);
        const diff = max.minus(min);
        const startMin = min.minus(min.mod(stepsize));
        const result = [];
        const amount = diff.div(stepsize);
        let sample = 1;
        if (amount.gt(maxsteps)) {
            sample = amount.div(maxsteps).round(0, big_js_1.default.roundUp);
        }
        let cur = startMin;
        let idx = 0;
        result.push(startMin.toNumber());
        while (max.gt(cur)) {
            cur = cur.plus(stepsize);
            if (!(idx % sample))
                result.push(cur.toNumber());
            idx++;
        }
        return result;
    }
    static fashhash(value) {
        return Math.floor(Math.sin(value) * 100000000);
    }
    static sampler(data, density) {
        const amount = data.length;
        const result = [];
        if (amount <= density) {
            let idx = 0;
            const lastIdx = data.length - 1;
            while (idx <= lastIdx) {
                result.push(idx);
                idx++;
            }
        }
        else {
            const sample = datamath.roundpow2(Math.ceil(amount / density));
            let idx = 0;
            const lastIdx = data.length - 1;
            while (idx <= lastIdx) {
                const hash = datamath.fashhash(data[idx]);
                if (!(hash % sample))
                    result.push(idx);
                idx++;
            }
        }
        return result;
    }
    static pick(data, keys) {
        const result = [];
        let idx = 0;
        const lastIdx = keys.length - 1;
        while (idx <= lastIdx) {
            const key = keys[idx];
            if (key in data)
                result.push(data[key]);
            idx++;
        }
        return result;
    }
    static interpolate(values1, axis1, axis2) {
        const values2 = values1.map((value1) => {
            const start = (0, utils_1.binarySearchNearest)(axis1, value1);
            if (start !== -1 && value1 === axis1[start])
                return axis2[start];
            const end = (0, utils_1.binarySearchNearest)(axis1, value1, true);
            if (end !== -1 && axis1[end] === value1)
                return axis2[end];
            // use linear interpolation to calc value2
            const value2 = (0, calc_utils_1.add)(axis2[start], (0, calc_utils_1.mul)((0, calc_utils_1.div)((0, calc_utils_1.sub)(value1, axis1[start]), (0, calc_utils_1.sub)(axis1[end], axis1[start])), (0, calc_utils_1.sub)(axis2[end], axis2[start])));
            return value2;
        });
        return values2;
    }
}
exports.default = datamath;
//# sourceMappingURL=index.js.map