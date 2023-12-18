"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.div = exports.sub = exports.mul = exports.add = exports.lte = exports.lt = exports.eq = exports.gte = exports.gt = exports.profitPercent = exports.actualReturn = exports.futureReturn = void 0;
const big_js_1 = __importDefault(require("big.js"));
const _constants_1 = require("../../constants/index.js");
const utils_1 = require("../utils");
const ONE = (0, big_js_1.default)(1);
const ZERO = (0, big_js_1.default)(0);
const VIGORISH = (0, big_js_1.default)(0.01);
function __inNumbers(...args) {
    for (const num of args) {
        if (num === '' ||
            isNaN(Number(num)) ||
            typeof Number(num) !== 'number')
            return false;
    }
    return true;
}
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
function gt(number1, number2) {
    number1 = (0, big_js_1.default)(number1);
    number2 = (0, big_js_1.default)(number2);
    return number1.gt(number2);
}
exports.gt = gt;
function gte(number1, number2) {
    number1 = (0, big_js_1.default)(number1);
    number2 = (0, big_js_1.default)(number2);
    return number1.gte(number2);
}
exports.gte = gte;
function eq(number1, number2) {
    number1 = (0, big_js_1.default)(number1);
    number2 = (0, big_js_1.default)(number2);
    return number1.eq(number2);
}
exports.eq = eq;
function lt(number1, number2) {
    number1 = (0, big_js_1.default)(number1);
    number2 = (0, big_js_1.default)(number2);
    return number1.lt(number2);
}
exports.lt = lt;
function lte(number1, number2) {
    number1 = (0, big_js_1.default)(number1);
    number2 = (0, big_js_1.default)(number2);
    return number1.lte(number2);
}
exports.lte = lte;
function add(number1, number2) {
    if (!__inNumbers(number1, number2))
        return '0';
    number1 = (0, big_js_1.default)(number1);
    number2 = (0, big_js_1.default)(number2);
    return number1
        .plus(number2)
        .toString() || 0;
}
exports.add = add;
function mul(number1, number2) {
    if (!__inNumbers(number1, number2))
        return '0';
    number1 = (0, big_js_1.default)(number1);
    number2 = (0, big_js_1.default)(number2);
    return number1
        .times(number2)
        .toString() || '0';
}
exports.mul = mul;
function sub(number1, number2) {
    if (!__inNumbers(number1, number2))
        return '0';
    number1 = (0, big_js_1.default)(number1);
    number2 = (0, big_js_1.default)(number2);
    return number1
        .minus(number2)
        .toString() || '0';
}
exports.sub = sub;
function div(number1, number2) {
    if (!__inNumbers(number1, number2))
        return '0';
    number1 = (0, big_js_1.default)(number1);
    number2 = (0, big_js_1.default)(number2);
    return number1
        .div(number2)
        .toString() || '0';
}
exports.div = div;
//# sourceMappingURL=index.js.map