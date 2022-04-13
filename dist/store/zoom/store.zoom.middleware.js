"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoomHandleMiddleware = void 0;
const enums_1 = require("../../data/enums");
const store_zoom_reducer_1 = require("./store.zoom.reducer");
class ZoomHandleMiddleware {
    handle(viewport, state, handler) {
        const reducer = new store_zoom_reducer_1.ZoomStateReducer(state);
        reducer.reduceState();
        return handler.next(viewport, state);
    }
    shouldSkip(state) {
        return state.inputEvent.type !== enums_1.InputEventTypes.zoom;
    }
    save(state) {
    }
}
exports.ZoomHandleMiddleware = ZoomHandleMiddleware;
//# sourceMappingURL=store.zoom.middleware.js.map