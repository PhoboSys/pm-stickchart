"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MousemoveEvent = void 0;
class MousemoveEvent extends Event {
    constructor(inner) {
        super(MousemoveEvent.NAME);
        if (!inner)
            return;
        this.inner = inner;
        const { offsetX, offsetY } = inner;
        this.pos = { x: offsetX, y: offsetY };
    }
}
exports.MousemoveEvent = MousemoveEvent;
MousemoveEvent.NAME = 'mousemove';
//# sourceMappingURL=MousemoveEvent.js.map