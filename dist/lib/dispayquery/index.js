"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayQuery = void 0;
class DisplayQuery {
    static build(app) {
        const screen = app.renderer.screen;
        return { screen };
    }
    static apply(query, config) {
        const { width, height } = config.screen;
        let result = { display: true };
        for (const prop in query) {
            if (prop !== 'default' && !eval(prop))
                continue;
            result = Object.assign(Object.assign({}, result), query[prop]);
        }
        return result;
    }
}
exports.DisplayQuery = DisplayQuery;
//# sourceMappingURL=index.js.map