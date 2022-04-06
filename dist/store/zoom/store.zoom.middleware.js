"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoomHandleMiddleware = void 0;
const store_zoom_reducer_1 = require("./store.zoom.reducer");
class ZoomHandleMiddleware {
    handle(viewport, state, handler) {
        var _a;
        (_a = state.emittedEvent) === null || _a === void 0 ? void 0 : _a.preventDefault();
        const reduce = new store_zoom_reducer_1.ZoomStateReducer(state);
        return handler.next(viewport, reduce.reduceState());
    }
    skip(state) {
        return !(state.emittedEvent instanceof WheelEvent);
    }
}
exports.ZoomHandleMiddleware = ZoomHandleMiddleware;
//# sourceMappingURL=store.zoom.middleware.js.map