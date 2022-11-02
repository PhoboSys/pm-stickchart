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
const VIGORISH = (0, big_js_1.default)(0.01);
function __inNotZeroNumbers(...args) {
    for (let num of args) {
        if (!Number(num))
            return false;
    }
    return true;
}
function __futureReturn(prizefunds, wager) {
    if (!__inNotZeroNumbers(prizefunds[positions_1.PRIZEFUNDS.TOTAL], wager))
        return (0, utils_1.mapValues)(prizefunds, () => ZERO);
    wager = (0, big_js_1.default)(wager);
    prizefunds = (0, utils_1.mapValues)(prizefunds, prizefund => (0, big_js_1.default)(prizefund));
    const result = {};
    for (const position in prizefunds) {
        result[position] = wager.plus(prizefunds[positions_1.PRIZEFUNDS.TOTAL])
            .times(wager.div(wager.plus(prizefunds[position])))
            .times(ONE.minus(VIGORISH));
    }
    return result;
}
function futureReturn(prizefunds, wager) {
    return (0, utils_1.mapValues)(__futureReturn(prizefunds, wager), ret => ret.toString());
}
exports.futureReturn = futureReturn;
function futureProfit(prizefunds, wager) {
    return (0, utils_1.mapValues)(__futureReturn(prizefunds, wager), ret => ret.minus(wager).toString());
}
exports.futureProfit = futureProfit;
function futureProfitPercent(prizefunds, wager) {
    if (!__inNotZeroNumbers(prizefunds[positions_1.PRIZEFUNDS.TOTAL], wager))
        return (0, utils_1.mapValues)(prizefunds, () => ZERO.toString());
    wager = (0, big_js_1.default)(wager);
    return (0, utils_1.mapValues)(__futureReturn(prizefunds, wager), ret => ret.div(wager).minus(1).toString());
}
exports.futureProfitPercent = futureProfitPercent;
function __actualReturn(prizefunds, wager, position) {
    if (!__inNotZeroNumbers(prizefunds[positions_1.PRIZEFUNDS.TOTAL], position, wager))
        return ZERO;
    wager = (0, big_js_1.default)(wager);
    prizefunds = (0, utils_1.mapValues)(prizefunds, prizefund => (0, big_js_1.default)(prizefund));
    const result = prizefunds[positions_1.PRIZEFUNDS.TOTAL]
        .times(wager.div(prizefunds[position]))
        .times(ONE.minus(VIGORISH));
    return result;
}
function actualReturn(prizefunds, wager, position) {
    const result = __actualReturn(prizefunds, wager, position);
    return result.toString();
}
exports.actualReturn = actualReturn;
function actualProfit(prizefunds, wager, position) {
    const result = __actualReturn(prizefunds, wager, position);
    return result.minus(wager).toString();
}
exports.actualProfit = actualProfit;
function actualProfitPercent(prizefunds, wager, position) {
    if (!__inNotZeroNumbers(prizefunds[positions_1.PRIZEFUNDS.TOTAL], wager, position))
        return ZERO.toString();
    const result = __actualReturn(prizefunds, wager, position);
    wager = (0, big_js_1.default)(wager);
    return result.div(wager).minus(1).toString();
}
exports.actualProfitPercent = actualProfitPercent;
//# sourceMappingURL=index.js.map