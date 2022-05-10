"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointerleaveEvent = void 0;
class PointerleaveEvent extends Event {
    constructor(inner) {
        super(PointerleaveEvent.NAME);
        this.inner = inner;
        this.position = { x: inner.offsetX, y: inner.offsetY };
    }
}
exports.PointerleaveEvent = PointerleaveEvent;
PointerleaveEvent.NAME = 'pointerleave';
//# sourceMappingURL=PointerleaveEvent.js.map