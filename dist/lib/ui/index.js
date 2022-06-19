"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _config_1 = __importDefault(require("../../config.js"));
const _constants_1 = require("../../constants/index.js");
const datamath_1 = __importDefault(require("../datamath"));
// eslint-disable-next-line @typescript-eslint/naming-convention
class ui {
    static currency(price, currently) {
        const symbols = {
            [_constants_1.USD]: '$'
        };
        let symb = symbols[currently] || '';
        if (!_config_1.default.price.showSymbols)
            symb = '';
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
}
exports.default = ui;
//# sourceMappingURL=index.js.map