"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridViewMiddleware = void 0;
const store_grid_view_1 = require("./store.grid.view");
class GridViewMiddleware {
    handle(viewport, state, handler) {
        const view = new store_grid_view_1.GridView(state, viewport);
        view.render();
        return handler.next(viewport, state);
    }
    shouldSkip(state) {
        return false;
    }
    save(state) {
    }
}
exports.GridViewMiddleware = GridViewMiddleware;
//# sourceMappingURL=store.grid.middleware.js.map