"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _CurrencyFormatter_formatters, _CurrencyFormatter_get, _CurrencyFormatter_key, _CurrencyFormatter_create, _CurrencyFormatter_createStandard, _CurrencyFormatter_createCustom;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyFormatter = void 0;
const _infra_1 = require("../../infra/index.js");
const SYMBOLS = {
    'WETH': 'Ξ',
    'WBTC': '₿',
};
class CurrencyFormatter {
    static formatSymboled(amount, currency, options) {
        const formatter = __classPrivateFieldGet(CurrencyFormatter, _a, "m", _CurrencyFormatter_get).call(CurrencyFormatter, currency, options);
        return formatter.formatSymboled(amount);
    }
    static formatUnsymboled(amount, currency, options) {
        const formatter = __classPrivateFieldGet(CurrencyFormatter, _a, "m", _CurrencyFormatter_get).call(CurrencyFormatter, currency, options);
        return formatter.formatUnsymboled(amount);
    }
    static formatNamed(amount, currency, options) {
        const formatter = __classPrivateFieldGet(CurrencyFormatter, _a, "m", _CurrencyFormatter_get).call(CurrencyFormatter, currency, options);
        return formatter.formatNamed(amount);
    }
    static formatDefault(amount, options) {
        const formatter = __classPrivateFieldGet(CurrencyFormatter, _a, "m", _CurrencyFormatter_get).call(CurrencyFormatter, CurrencyFormatter.DEFAULT, options);
        return formatter.formatUnsymboled(amount);
    }
}
exports.CurrencyFormatter = CurrencyFormatter;
_a = CurrencyFormatter, _CurrencyFormatter_get = function _CurrencyFormatter_get(currency, options = {}) {
    const key = __classPrivateFieldGet(CurrencyFormatter, _a, "m", _CurrencyFormatter_key).call(CurrencyFormatter, currency, options);
    if (!__classPrivateFieldGet(CurrencyFormatter, _a, "f", _CurrencyFormatter_formatters)[key]) {
        __classPrivateFieldGet(CurrencyFormatter, _a, "f", _CurrencyFormatter_formatters)[key] = __classPrivateFieldGet(CurrencyFormatter, _a, "m", _CurrencyFormatter_create).call(CurrencyFormatter, currency, options);
    }
    return __classPrivateFieldGet(CurrencyFormatter, _a, "f", _CurrencyFormatter_formatters)[key];
}, _CurrencyFormatter_key = function _CurrencyFormatter_key(currency, options) {
    return JSON.stringify(Object.assign({ currency }, options));
}, _CurrencyFormatter_create = function _CurrencyFormatter_create(currency, options) {
    try {
        return __classPrivateFieldGet(CurrencyFormatter, _a, "m", _CurrencyFormatter_createStandard).call(CurrencyFormatter, currency, options);
    }
    catch (_b) {
        return __classPrivateFieldGet(CurrencyFormatter, _a, "m", _CurrencyFormatter_createCustom).call(CurrencyFormatter, currency, options);
    }
}, _CurrencyFormatter_createStandard = function _CurrencyFormatter_createStandard(currency, options) {
    const fSymboled = new Intl.NumberFormat('en-US', Object.assign({ style: 'currency', currency, currencyDisplay: 'narrowSymbol' }, options));
    const fCoded = new Intl.NumberFormat('en-US', Object.assign({ style: 'currency', currency, currencyDisplay: 'code' }, options));
    const formatter = {
        formatUnsymboled: (amount) => fCoded.format(amount).replace(new RegExp(`\s+${currency}\s+`), ''),
        formatSymboled: (amount) => fSymboled.format(amount),
        formatNamed: (amount) => fCoded.format(amount),
    };
    _infra_1.Logger.info('Standard Currency Formatter Create: "%s"', currency);
    return formatter;
}, _CurrencyFormatter_createCustom = function _CurrencyFormatter_createCustom(currency, options) {
    const fDefault = new Intl.NumberFormat('en-US', Object.assign({ style: 'currency', currency: 'USD' }, options));
    const formatter = {
        formatUnsymboled: (amount) => fDefault.format(amount).replace('$', ''),
        formatSymboled: (amount) => fDefault.format(amount).replace('$', (SYMBOLS[currency] || '')),
        formatNamed: (amount) => [fDefault.format(amount).replace('$', ''), currency].join(' '),
    };
    _infra_1.Logger.info('Custom Currency Formatter Create: "%s"', currency || 'DEFAULT');
    return formatter;
};
_CurrencyFormatter_formatters = { value: {} };
CurrencyFormatter.DEFAULT = '';
//# sourceMappingURL=index.js.map