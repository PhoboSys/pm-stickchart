"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntervalsHandlerMiddleware = void 0;
const store_intervls_reducer_1 = require("./store.intervls.reducer");
class IntervalsHandlerMiddleware {
    handle(viewport, state, handler) {
        const reducer = new store_intervls_reducer_1.IntervalsStateReducer(state);
        reducer.reduceState();
        return handler.next(viewport, state);
    }
    shouldSkip(state) {
        return false;
    }
    save(state) {
    }
}
exports.IntervalsHandlerMiddleware = IntervalsHandlerMiddleware;
//# sourceMappingURL=store.intervals.middleware.js.map