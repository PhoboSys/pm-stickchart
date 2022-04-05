"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoomHandleMiddleware = void 0;
const store_zoom_mutator_1 = require("./store.zoom.mutator");
class ZoomHandleMiddleware {
    handle(viewport, state, handler) {
        var _a;
        (_a = state.zoomEvent) === null || _a === void 0 ? void 0 : _a.preventDefault();
        const mutator = new store_zoom_mutator_1.ZoomStateMutator(state);
        return handler.next(viewport, mutator.mutateState());
    }
    skip(state) {
        return state.zoomEvent === undefined;
    }
}
exports.ZoomHandleMiddleware = ZoomHandleMiddleware;
//# sourceMappingURL=store.zoom.middleware.js.map