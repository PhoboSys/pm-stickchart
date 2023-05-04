"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UNIX_WEEK = exports.UNIX_DAY = exports.UNIX_HOUR = exports.UNIX_MINUTE = void 0;
const big_js_1 = __importDefault(require("big.js"));
const _config_1 = __importDefault(require("../../config.js"));
const datamath_1 = __importDefault(require("../datamath"));
const utils_1 = require("../utils");
const currency_1 = require("../currency");
exports.UNIX_MINUTE = 60;
exports.UNIX_HOUR = 60 * exports.UNIX_MINUTE;
exports.UNIX_DAY = 24 * exports.UNIX_HOUR;
exports.UNIX_WEEK = 7 * exports.UNIX_DAY;
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
    static currency(price, currency) {
        const options = {
            minimumFractionDigits: _config_1.default.price.minimumFractionDigits,
            maximumFractionDigits: _config_1.default.price.maximumFractionDigits,
        };
        if (_config_1.default.price.showSymbols) {
            return currency_1.CurrencyFormatter.formatSymboled(price, currency, options);
        }
        return currency_1.CurrencyFormatter.formatUnsymboled(price, currency, options);
    }
    static currencyScaled(price, currency, scale) {
        const step = new big_js_1.default(scale);
        const fractionDigits = Math.max(-step.e, 0);
        const options = {
            minimumFractionDigits: fractionDigits,
            maximumFractionDigits: fractionDigits,
        };
        if (_config_1.default.price.showSymbols) {
            return currency_1.CurrencyFormatter.formatSymboled(price, currency, options);
        }
        return currency_1.CurrencyFormatter.formatUnsymboled(price, currency, options);
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