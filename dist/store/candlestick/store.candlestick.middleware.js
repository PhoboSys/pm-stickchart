"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandleStickViewMiddleware = void 0;
const enums_1 = require("../../data/enums");
const store_candlestick_view_1 = require("./store.candlestick.view");
class CandleStickViewMiddleware {
    handle(viewport, eventEmitter, state, handler) {
        const view = new store_candlestick_view_1.CandleStickView(state, viewport);
        view.render();
        return handler.next(viewport, eventEmitter, state);
    }
    shouldSkip(state) {
        const { chartType, dataManager } = state;
        return dataManager.data.length < 1 || chartType !== enums_1.ChartTypes.candleSticks;
    }
    save(state) {
    }
}
exports.CandleStickViewMiddleware = CandleStickViewMiddleware;
//# sourceMappingURL=store.candlestick.middleware.js.map