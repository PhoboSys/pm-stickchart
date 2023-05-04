"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Priceframe = void 0;
const datamath_1 = __importDefault(require("../datamath"));
const utils_1 = require("../utils");
class Priceframe {
    get() {
        return { since: this.since, until: this.until };
    }
    set({ since, until }) {
        if (since || since === 0)
            this.since = since;
        if (until || until === 0)
            this.until = until;
        return this;
    }
    isInitialized() {
        return (!!this.since || this.since === 0) && (!!this.until || this.until === 0);
    }
    calculate(prices) {
        const [since, until] = datamath_1.default.minmax(prices.map(Number));
        const priceframe = { since, until };
        return new utils_1.GetSet(() => priceframe, this.set.bind(this));
    }
}
exports.Priceframe = Priceframe;
//# sourceMappingURL=index.js.map