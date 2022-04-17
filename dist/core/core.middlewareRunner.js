"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddlewareRunner = void 0;
const core_middlewareHandler_1 = require("./core.middlewareHandler");
class MiddlewareRunner {
    constructor(middlewares = []) {
        this.middlewares = middlewares;
    }
    add(middleware) {
        this.middlewares.push(middleware);
    }
    run(viewport, eventEmitter, state) {
        const handler = new core_middlewareHandler_1.MiddlewareHandler(this.middlewares);
        return handler.next(viewport, eventEmitter, state);
    }
}
exports.MiddlewareRunner = MiddlewareRunner;
//# sourceMappingURL=core.middlewareRunner.js.map