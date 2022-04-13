"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandleStickMiddleware = void 0;
const enums_1 = require("../../data/enums");
const store_candlestick_view_1 = require("./store.candlestick.view");
class CandleStickMiddleware {
    handle(viewport, state, handler) {
        const view = new store_candlestick_view_1.CandleStickView(state, viewport);
        view.render();
        return handler.next(viewport, state);
    }
    shouldSkip(state) {
        return state.data.length < 1 || state.viewConfig.chartType !== enums_1.ChartTypes.candleSticks;
    }
    save(state) {
    }
}
exports.CandleStickMiddleware = CandleStickMiddleware;
//# sourceMappingURL=store.candlestick.middleware.js.map