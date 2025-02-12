"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.div = exports.sub = exports.mul = exports.add = exports.lte = exports.lt = exports.eq = exports.gte = exports.gt = exports.profitPercent = exports.actualReturnDecimal = exports.actualReturn = exports.__actualReturn = exports.futureReturn = exports.fromDecimalERC20 = exports.toDecimalERC20 = exports.fromDecimal = void 0;
const big_js_1 = __importDefault(require("big.js"));
const lodash_1 = require("lodash");
const _constants_1 = require("../../constants/index.js");
const utils_1 = require("../utils");
const ZERO = (0, big_js_1.default)(0);
const ONE = (0, big_js_1.default)(1);
const TEN = (0, big_js_1.default)(10);
const VIGORISH = (0, big_js_1.default)(0.01);
const VIGORISH_PERCENT = (0, big_js_1.default)(1);
function __inNumbers(...args) {
    for (const num of args) {
        if (num === '' ||
            isNaN(Number(num)) ||
            typeof Number(num) !== 'number')
            return false;
    }
    return true;
}
function toDecimal(number, decimals) {
    if (!__inNumbers(number, decimals))
        return '';
    return (0, big_js_1.default)(number)
        .div(TEN.pow(decimals))
        .toString();
}
function fromDecimal(number, decimals) {
    if (!__inNumbers(number, decimals))
        return '';
    return (0, big_js_1.default)(number)
        .times(TEN.pow(decimals))
        .toString();
}
exports.fromDecimal = fromDecimal;
function toDecimalERC20(amount, erc20) {
    erc20 = (0, lodash_1.toLower)(erc20);
    if (!amount)
        return amount;
    if (!_constants_1.ERC20[erc20])
        return amount;
    return toDecimal(amount, _constants_1.ERC20.DECIMALS[_constants_1.ERC20[erc20]]);
}
exports.toDecimalERC20 = toDecimalERC20;
function fromDecimalERC20(amount, erc20) {
    erc20 = (0, lodash_1.toLower)(erc20);
    if (!amount)
        return amount;
    if (!_constants_1.ERC20[erc20])
        return amount;
    return fromDecimal(amount, _constants_1.ERC20.DECIMALS[_constants_1.ERC20[erc20]]);
}
exports.fromDecimalERC20 = fromDecimalERC20;
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
    const prize = (0, big_js_1.default)(prizefunds[_constants_1.PRIZEFUNDS.TOTAL]).times(wager).div(prizefunds[position]).round(0, big_js_1.default.roundDown);
    const commission = prize.times(VIGORISH_PERCENT).div(100).round(0, big_js_1.default.roundUp);
    const result = prize.minus(commission);
    return result;
}
exports.__actualReturn = __actualReturn;
function actualReturn(prizefunds, wager, position) {
    const result = __actualReturn(prizefunds, wager, position);
    return result.toString();
}
exports.actualReturn = actualReturn;
function actualReturnDecimal(prizefunds, wager, position, erc20) {
    prizefunds = (0, utils_1.mapValues)(prizefunds, (amount) => fromDecimalERC20(amount, erc20));
    wager = fromDecimalERC20(wager, erc20);
    return toDecimalERC20(actualReturn(prizefunds, wager, position), erc20);
}
exports.actualReturnDecimal = actualReturnDecimal;
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