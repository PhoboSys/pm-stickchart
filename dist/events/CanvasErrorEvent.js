"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasErrorEvent = void 0;
class CanvasErrorEvent extends Event {
    constructor(inner) {
        super(CanvasErrorEvent.NAME);
        this.inner = inner;
    }
}
exports.CanvasErrorEvent = CanvasErrorEvent;
CanvasErrorEvent.NAME = 'error';
//# sourceMappingURL=CanvasErrorEvent.js.map