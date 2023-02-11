"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointerupEvent = void 0;
class PointerupEvent extends Event {
    constructor(inner) {
        super(PointerupEvent.NAME);
        this.inner = inner;
        this.position = { x: inner.offsetX, y: inner.offsetY };
    }
}
exports.PointerupEvent = PointerupEvent;
PointerupEvent.NAME = 'pointerup';
//# sourceMappingURL=PointerupEvent.js.map