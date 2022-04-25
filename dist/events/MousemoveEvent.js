"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MousemoveEvent = void 0;
class MousemoveEvent extends Event {
    constructor(inner) {
        super(MousemoveEvent.NAME);
        this.inner = inner;
        this.position = { x: inner.offsetX, y: inner.offsetY };
    }
}
exports.MousemoveEvent = MousemoveEvent;
MousemoveEvent.NAME = 'mousemove';
//# sourceMappingURL=MousemoveEvent.js.map