"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddlewareHandler = void 0;
class MiddlewareHandler {
    constructor(middlewares = [], state = undefined) {
        this.middlewares = middlewares;
        this.state = state;
    }
    next(viewport, state) {
        const { middlewares } = this;
        const middleware = middlewares.at(0);
        if (middleware === undefined)
            return this;
        const handler = new MiddlewareHandler(middlewares.slice(1), state);
        if (middleware.skip(state))
            return handler.next(viewport, state);
        return middleware.handle(viewport, state, handler);
    }
}
exports.MiddlewareHandler = MiddlewareHandler;
//# sourceMappingURL=core.middlewareHandler.js.map