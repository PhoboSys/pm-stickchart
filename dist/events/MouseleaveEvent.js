"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MouseleaveEvent = void 0;
class MouseleaveEvent extends Event {
    constructor(inner) {
        super(MouseleaveEvent.NAME);
        this.inner = inner;
        this.position = { x: inner.offsetX, y: inner.offsetY };
    }
}
exports.MouseleaveEvent = MouseleaveEvent;
MouseleaveEvent.NAME = 'mouseleave';
//# sourceMappingURL=MouseleaveEvent.js.map