"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointerdownEvent = void 0;
class PointerdownEvent extends Event {
    constructor(inner) {
        super(PointerdownEvent.NAME);
        this.inner = inner;
        this.position = { x: inner.offsetX, y: inner.offsetY };
    }
}
exports.PointerdownEvent = PointerdownEvent;
PointerdownEvent.NAME = 'pointerdown';
//# sourceMappingURL=PointerdownEvent.js.map