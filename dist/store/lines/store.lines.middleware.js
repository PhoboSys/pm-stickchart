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
        var _a, _b, _c;
        return ((_c = (_b = (_a = state.renderConfig.dataManager) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0) < 1 || state.viewConfig.chartType !== enums_1.ChartTypes.lines;
    }
    save(state) {
    }
}
exports.LinesViewMiddleware = LinesViewMiddleware;
//# sourceMappingURL=store.lines.middleware.js.map