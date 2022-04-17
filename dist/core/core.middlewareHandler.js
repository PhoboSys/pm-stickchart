"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddlewareHandler = void 0;
class MiddlewareHandler {
    constructor(middlewares = [], state = undefined) {
        this.middlewares = middlewares;
        this.state = state;
    }
    next(viewport, eventEmitter, state) {
        const { middlewares } = this;
        const middleware = middlewares.at(0);
        if (middleware === undefined)
            return this;
        const nextHandler = new MiddlewareHandler(middlewares.slice(1), state);
        if (middleware.shouldSkip(state))
            return nextHandler.next(viewport, eventEmitter, state);
        const handled = middleware.handle(viewport, eventEmitter, state, nextHandler);
        middleware.save(state);
        return handled;
    }
}
exports.MiddlewareHandler = MiddlewareHandler;
//# sourceMappingURL=core.middlewareHandler.js.map