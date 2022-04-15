"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollHandleMiddleware = void 0;
const enums_1 = require("../../data/enums");
const store_scroll_reducer_1 = require("./store.scroll.reducer");
class ScrollHandleMiddleware {
    constructor() {
        this.lastEvent = null;
    }
    handle(viewport, state, handler) {
        const reduce = new store_scroll_reducer_1.ScrollStateReducer(state, this.lastEvent);
        reduce.reduceState();
        return handler.next(viewport, state);
    }
    shouldSkip(state) {
        var _a;
        return ((_a = state.inputEvent) === null || _a === void 0 ? void 0 : _a.type) !== enums_1.InputEventTypes.scroll;
    }
    save(state) {
        var _a;
        this.lastEvent = Object.assign({}, (_a = state.inputEvent) === null || _a === void 0 ? void 0 : _a.event);
    }
}
exports.ScrollHandleMiddleware = ScrollHandleMiddleware;
//# sourceMappingURL=store.scroll.middleware.js.map