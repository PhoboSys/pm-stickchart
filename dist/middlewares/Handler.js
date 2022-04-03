"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddlewareHandler = void 0;
class MiddlewareHandler {
    constructor(middlewares = [], options = undefined) {
        this.middlewares = middlewares;
        this.options = options;
    }
    add(middleware) {
        this.middlewares.push(middleware);
    }
    next(options) {
        var _a;
        const { middlewares } = this;
        const next = middlewares.at(0);
        console.log(options);
        console.log(next);
        console.log(middlewares.slice(0, 1));
        return (_a = next === null || next === void 0 ? void 0 : next.handle(options, new MiddlewareHandler(middlewares.slice(1), options))) !== null && _a !== void 0 ? _a : this;
    }
}
exports.MiddlewareHandler = MiddlewareHandler;
//# sourceMappingURL=Handler.js.map