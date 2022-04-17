"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollHandleMiddleware = void 0;
const enums_1 = require("../../data/enums");
const enum_outputEventTypes_1 = require("../../data/enums/enum.outputEventTypes");
const store_scroll_reducer_1 = require("./store.scroll.reducer");
class ScrollHandleMiddleware {
    handle(viewport, eventEmitter, state, handler) {
        const reduce = new store_scroll_reducer_1.ScrollStateReducer(state, this.lastEvent);
        reduce.reduceState();
        eventEmitter.emit(enum_outputEventTypes_1.OutputEventTypes.scroll, 'scrollEvent');
        return handler.next(viewport, eventEmitter, state);
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