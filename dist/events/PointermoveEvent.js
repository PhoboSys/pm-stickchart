"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointermoveEvent = void 0;
class PointermoveEvent extends Event {
    constructor(inner) {
        super(PointermoveEvent.NAME);
        this.inner = inner;
        this.position = { x: inner.offsetX, y: inner.offsetY };
    }
}
exports.PointermoveEvent = PointermoveEvent;
PointermoveEvent.NAME = 'pointermove';
//# sourceMappingURL=PointermoveEvent.js.map