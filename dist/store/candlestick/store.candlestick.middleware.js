"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandleStickMiddleware = void 0;
const store_candlestick_view_1 = require("./store.candlestick.view");
class CandleStickMiddleware {
    handle(viewport, state, handler) {
        const view = new store_candlestick_view_1.CandleStickView(state, viewport);
        view.render();
        return handler.next(viewport, state);
    }
    skip(state) {
        return state.renderSticks.length < 1;
    }
}
exports.CandleStickMiddleware = CandleStickMiddleware;
//# sourceMappingURL=store.candlestick.middleware.js.map