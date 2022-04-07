"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollHandleMiddleware = void 0;
const utils_handledEvent_1 = require("../../utils/utils.handledEvent");
const utils_scrollEvent_1 = require("../../utils/utils.scrollEvent");
const store_scroll_reducer_1 = require("./store.scroll.reducer");
class ScrollHandleMiddleware {
    constructor() {
        this.lastEvent = null;
    }
    handle(viewport, state, handler) {
        const reduce = new store_scroll_reducer_1.ScrollStateReducer(state, this.lastEvent);
        reduce.reduceState();
        this.cloneEvent(state);
        state.emittedEvent = new utils_handledEvent_1.HandledEvent();
        return handler.next(viewport, state);
    }
    skip(state) {
        return !(state.emittedEvent instanceof utils_scrollEvent_1.ScrollEvent);
    }
    cloneEvent(state) {
        this.lastEvent = Object.assign({}, state.emittedEvent);
    }
}
exports.ScrollHandleMiddleware = ScrollHandleMiddleware;
//# sourceMappingURL=store.scroll.middleware.js.map