"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualProfitPercent = exports.actualProfit = exports.actualReturn = exports.futureProfitPercent = exports.futureProfit = exports.futureReturn = void 0;
const big_js_1 = __importDefault(require("big.js"));
const positions_1 = require("../../constants/positions");
const utils_1 = require("../../lib/utils");
const ONE = (0, big_js_1.default)(1);
const ZERO = (0, big_js_1.default)(0);
function __inNotZeroNumbers(...args) {
    for (let num of args) {
        if (!Number(num))
            return false;
    }
    return true;
}
function __futureReturn(prizefunds, wager, vigorish = 0.01) {
    if (!__inNotZeroNumbers(prizefunds[positions_1.PRIZEFUNDS.TOTAL], wager, vigorish))
        return (0, utils_1.mapValues)(prizefunds, () => ZERO);
    wager = (0, big_js_1.default)(wager);
    vigorish = (0, big_js_1.default)(vigorish);
    prizefunds = (0, utils_1.mapValues)(prizefunds, prizefund => (0, big_js_1.default)(prizefund));
    const result = {};
    for (const position in prizefunds) {
        result[position] = wager.plus(prizefunds[positions_1.PRIZEFUNDS.TOTAL])
            .times(wager.div(wager.plus(prizefunds[position])))
            .times(ONE.minus(vigorish));
    }
    return result;
}
function futureReturn(prizefunds, wager, vigorish = 0.01) {
    return (0, utils_1.mapValues)(__futureReturn(prizefunds, wager, vigorish), ret => ret.toString());
}
exports.futureReturn = futureReturn;
function futureProfit(prizefunds, wager, vigorish = 0.01) {
    return (0, utils_1.mapValues)(__futureReturn(prizefunds, wager, vigorish), ret => ret.minus(wager).toString());
}
exports.futureProfit = futureProfit;
function futureProfitPercent(prizefunds, wager, vigorish = 0.01) {
    if (!__inNotZeroNumbers(prizefunds[positions_1.PRIZEFUNDS.TOTAL], wager, vigorish))
        return (0, utils_1.mapValues)(prizefunds, () => ZERO.toString());
    wager = (0, big_js_1.default)(wager);
    return (0, utils_1.mapValues)(__futureReturn(prizefunds, wager, vigorish), ret => ret.div(wager).minus(1).toString());
}
exports.futureProfitPercent = futureProfitPercent;
function __actualReturn(prizefunds, wager, position, vigorish = 0.01) {
    if (!__inNotZeroNumbers(prizefunds[positions_1.PRIZEFUNDS.TOTAL], position, wager, vigorish))
        return ZERO;
    wager = (0, big_js_1.default)(wager);
    vigorish = (0, big_js_1.default)(vigorish);
    prizefunds = (0, utils_1.mapValues)(prizefunds, prizefund => (0, big_js_1.default)(prizefund));
    const result = prizefunds[positions_1.PRIZEFUNDS.TOTAL]
        .times(wager.div(prizefunds[position]))
        .times(ONE.minus(vigorish));
    return result;
}
function actualReturn(prizefunds, wager, position, vigorish = 0.01) {
    const result = __actualReturn(prizefunds, wager, position, vigorish);
    return result.toString();
}
exports.actualReturn = actualReturn;
function actualProfit(prizefunds, wager, position, vigorish = 0.01) {
    const result = __actualReturn(prizefunds, wager, position, vigorish);
    return result.minus(wager).toString();
}
exports.actualProfit = actualProfit;
function actualProfitPercent(prizefunds, wager, position, vigorish = 0.01) {
    if (!__inNotZeroNumbers(prizefunds[positions_1.PRIZEFUNDS.TOTAL], wager, position, vigorish))
        return ZERO.toString();
    const result = __actualReturn(prizefunds, wager, position, vigorish);
    wager = (0, big_js_1.default)(wager);
    return result.div(wager).minus(1).toString();
}
exports.actualProfitPercent = actualProfitPercent;
//# sourceMappingURL=index.js.map