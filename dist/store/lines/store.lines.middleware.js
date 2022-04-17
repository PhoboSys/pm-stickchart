"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinesViewMiddleware = void 0;
const enums_1 = require("../../data/enums");
const store_lines_view_1 = require("./store.lines.view");
class LinesViewMiddleware {
    handle(viewport, state, handler) {
        const view = new store_lines_view_1.LinesView(state, viewport);
        view.render();
        return handler.next(viewport, state);
    }
    shouldSkip(state) {
        const { chartType, dataManager } = state;
        return dataManager.length === 0 || chartType !== enums_1.ChartTypes.lines;
    }
    save(state) {
    }
}
exports.LinesViewMiddleware = LinesViewMiddleware;
//# sourceMappingURL=store.lines.middleware.js.map