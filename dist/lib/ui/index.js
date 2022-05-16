"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const currencies_1 = require("../../constants/currencies");
const datamath_1 = __importDefault(require("../datamath"));
// eslint-disable-next-line @typescript-eslint/naming-convention
class ui {
    static currency(price, currently) {
        const symbols = {
            [currencies_1.USD]: '$'
        };
        let symb = symbols[currently] || '';
        if (!config_1.default.price.showSymbols)
            symb = '';
        return symb + datamath_1.default.toFixedPrecision(price, config_1.default.price.precision);
    }
    static currencyScaled(price, currently, scale) {
        const symbols = {
            [currencies_1.USD]: '$'
        };
        let symb = symbols[currently] || '';
        if (!config_1.default.price.showSymbols)
            symb = '';
        return symb + datamath_1.default.toFixedScaled(price, scale);
    }
}
exports.default = ui;
//# sourceMappingURL=index.js.map