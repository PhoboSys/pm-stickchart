"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const big_js_1 = __importDefault(require("big.js"));
// eslint-disable-next-line @typescript-eslint/naming-convention
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
        return step;
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
    static precision(value, significant) {
        const v = new big_js_1.default(value);
        return v.prec(significant).toNumber();
    }
    static toFixedPrecision(value, significant) {
        const v = datamath.precision(value, significant);
        if (v % 1) {
            return v.toString().padEnd(significant + 1, '0');
        }
        const more = significant - v.toString().length;
        if (more > 0) {
            return v.toFixed(more);
        }
        return v.toFixed(0);
    }
    static toFixedScaled(value, stepsize) {
        const step = new big_js_1.default(stepsize);
        return datamath.toFixed(value, -step.e);
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
    static sample(data, density) {
        const amount = new big_js_1.default(data.length);
        if (amount.lte(density))
            return data;
        const result = [];
        const sample = amount.div(density).round(0, big_js_1.default.roundUp).toNumber();
        let idx = 0;
        const lastIdx = data.length - 1;
        while (idx <= lastIdx) {
            if (!(idx % sample))
                result.push(data[idx]);
            idx++;
        }
        return result;
    }
    static returnPrize(args) {
        const { positiveFund, negativeFund, wager, position, resolution, precision, } = args;
        let prize = 0;
        const win = resolution === position;
        const neutral = resolution === 'NEU';
        if (neutral)
            prize = wager;
        if (win && position === 'POS') {
            prize = datamath.dividends(positiveFund, negativeFund, wager);
        }
        if (win && position === 'NEG') {
            prize = datamath.dividends(negativeFund, positiveFund, wager);
        }
        const result = new big_js_1.default(prize);
        return result.round(precision, big_js_1.default.roundDown).toNumber();
    }
    static dividends(pool1v, pool2v, wagerv, vigorishv = 0.01) {
        const pool1 = new big_js_1.default(pool1v);
        const pool2 = new big_js_1.default(pool2v);
        const wager = new big_js_1.default(wagerv);
        const vigorish = new big_js_1.default(vigorishv);
        if (pool1.eq(0))
            return 0;
        if (pool2.eq(0))
            return wager;
        const totalfund = pool1.plus(pool2);
        const result = totalfund.times(wager.div(pool1));
        const commision = result.times(vigorish);
        return result
            .minus(commision)
            .toNumber() || 0;
    }
    static profitPercent(wagerv, basev, precision, multiplicator = 100) {
        const wager = new big_js_1.default(wagerv);
        const base = new big_js_1.default(basev);
        return wager
            .div(base)
            .times(multiplicator)
            .minus(multiplicator)
            .round(precision, big_js_1.default.roundDown)
            .toNumber() || 0;
    }
}
exports.default = datamath;
//# sourceMappingURL=index.js.map