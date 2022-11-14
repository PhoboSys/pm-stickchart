"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UNIX_WEEK = exports.UNIX_DAY = exports.UNIX_HOUR = exports.UNIX_MINUTE = void 0;
const _config_1 = __importDefault(require("../../config.js"));
const _constants_1 = require("../../constants/index.js");
const datamath_1 = __importDefault(require("../datamath"));
const utils_1 = require("../utils");
exports.UNIX_MINUTE = 60;
exports.UNIX_HOUR = 60 * exports.UNIX_MINUTE;
exports.UNIX_DAY = 24 * exports.UNIX_HOUR;
exports.UNIX_WEEK = 7 * exports.UNIX_DAY;
// eslint-disable-next-line @typescript-eslint/naming-convention
class ui {
    static percent(amount) {
        if (!amount)
            return '';
        let s = '+';
        if (amount < 0)
            s = '';
        return s + datamath_1.default.percent(amount, _config_1.default.ui.precision.percent) + '%';
    }
    static erc20(amount) {
        if (!amount)
            return '0';
        return datamath_1.default.round(amount, _config_1.default.ui.precision.erc20).toString();
    }
    static currency(price, currently = '') {
        let symb = '';
        if (currently && _config_1.default.price.showSymbols) {
            const symbols = {
                [_constants_1.USD]: '$'
            };
            symb = symbols[currently];
        }
        return symb + datamath_1.default.toFixedPrecision(price, _config_1.default.price.precision);
    }
    static currencyScaled(price, currently, scale) {
        const symbols = {
            [_constants_1.USD]: '$'
        };
        let symb = symbols[currently] || '';
        if (!_config_1.default.price.showSymbols)
            symb = '';
        return symb + datamath_1.default.toFixedScaled(price, scale);
    }
    static time24(timestamp) {
        const date = (0, utils_1.unixTStoDate)(timestamp);
        const hh = date.getHours();
        const mm = date.getMinutes().toString().padStart(2, '0');
        return `${hh || '00'}:${mm}`;
    }
    static duration24(duration) {
        const ss = Math.floor(duration) % 60;
        const mm = Math.floor(duration / exports.UNIX_MINUTE) % 60;
        const hh = Math.floor(duration / exports.UNIX_HOUR) % 60;
        const dd = Math.floor(duration / exports.UNIX_DAY) % 24;
        const pritty = [];
        // remove prepending zeros
        for (const part of [dd, hh, mm, ss]) {
            if (pritty.length)
                pritty.push(part.toFixed().padStart(2, '0'));
            else if (part)
                pritty.push(part);
        }
        return pritty.join(':') || '0';
    }
}
exports.default = ui;
//# sourceMappingURL=index.js.map