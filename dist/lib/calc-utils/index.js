"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profitPercent = exports.actualReturn = exports.futureReturn = void 0;
const big_js_1 = __importDefault(require("big.js"));
const _constants_1 = require("../../constants/index.js");
const utils_1 = require("../utils");
const ONE = (0, big_js_1.default)(1);
const ZERO = (0, big_js_1.default)(0);
const VIGORISH = (0, big_js_1.default)(0.01);
function __inNotZeroNumbers(...args) {
    for (const num of args) {
        if (!Number(num))
            return false;
    }
    return true;
}
function __futureReturn(prizefunds, wager, position) {
    if (!__inNotZeroNumbers(prizefunds === null || prizefunds === void 0 ? void 0 : prizefunds[_constants_1.PRIZEFUNDS.TOTAL], prizefunds === null || prizefunds === void 0 ? void 0 : prizefunds[position], wager))
        return ZERO;
    wager = (0, big_js_1.default)(wager);
    prizefunds = (0, utils_1.mapValues)(prizefunds, prizefund => (0, big_js_1.default)(prizefund));
    const result = wager.plus(prizefunds[_constants_1.PRIZEFUNDS.TOTAL])
        .times(wager.div(wager.plus(prizefunds[position])))
        .times(ONE.minus(VIGORISH));
    return result;
}
function futureReturn(prizefunds, wager, position) {
    const result = __futureReturn(prizefunds, wager, position);
    return result.toString();
}
exports.futureReturn = futureReturn;
function __actualReturn(prizefunds, wager, position) {
    if (!__inNotZeroNumbers(prizefunds === null || prizefunds === void 0 ? void 0 : prizefunds[_constants_1.PRIZEFUNDS.TOTAL], prizefunds === null || prizefunds === void 0 ? void 0 : prizefunds[position], wager))
        return ZERO;
    wager = (0, big_js_1.default)(wager);
    prizefunds = (0, utils_1.mapValues)(prizefunds, prizefund => (0, big_js_1.default)(prizefund));
    const result = prizefunds[_constants_1.PRIZEFUNDS.TOTAL]
        .times(wager.div(prizefunds[position]))
        .times(ONE.minus(VIGORISH));
    return result;
}
function actualReturn(prizefunds, wager, position) {
    const result = __actualReturn(prizefunds, wager, position);
    return result.toString();
}
exports.actualReturn = actualReturn;
function profitPercent(prize, wager) {
    if (!__inNotZeroNumbers(prize, wager))
        return ZERO.toString();
    prize = (0, big_js_1.default)(prize);
    wager = (0, big_js_1.default)(wager);
    return prize.div(wager).minus(1).toString();
}
exports.profitPercent = profitPercent;
//# sourceMappingURL=index.js.map