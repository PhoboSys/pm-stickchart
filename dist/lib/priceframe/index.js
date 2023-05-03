"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Priceframe = void 0;
const datamath_1 = __importDefault(require("../datamath"));
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
    initialize(prices) {
        this.setByPrices(prices);
        return this;
    }
    getByPrices(prices) {
        const [since, until] = datamath_1.default.minmax(prices.map(Number));
        return { since, until };
    }
    setByPrices(prices) {
        return this.set(this.getByPrices(prices));
    }
}
exports.Priceframe = Priceframe;
//# sourceMappingURL=index.js.map