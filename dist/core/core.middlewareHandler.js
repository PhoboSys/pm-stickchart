"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddlewareHandler = void 0;
class MiddlewareHandler {
    constructor(middlewares = [], state = undefined) {
        this.middlewares = middlewares;
        this.state = state;
    }
    add(middleware) {
        this.middlewares.push(middleware);
    }
    next(viewport, state) {
        var _a;
        const { middlewares } = this;
        const next = middlewares.at(0);
        return (_a = next === null || next === void 0 ? void 0 : next.handle(viewport, state, new MiddlewareHandler(middlewares.slice(1), state))) !== null && _a !== void 0 ? _a : this;
    }
}
exports.MiddlewareHandler = MiddlewareHandler;
//# sourceMappingURL=core.middlewareHandler.js.map