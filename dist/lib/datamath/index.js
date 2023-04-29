"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const big_js_1 = __importDefault(require("big.js"));
class datamath {
    static min(data) {
        let [minimum] = data;
        for (const item of data) {
            if (item < minimum)
                minimum = item;
        }
        return minimum;
    }
    static max(data) {
        let [maximum] = data;
        for (const item of data) {
            if (item > maximum)
                maximum = item;
        }
        return maximum;
    }
    static minmax(data) {
        let [minimum] = data;
        let [maximum] = data;
        for (const item of data) {
            if (item < minimum)
                minimum = item;
            if (item > maximum)
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
}
exports.default = datamath;
//# sourceMappingURL=index.js.map