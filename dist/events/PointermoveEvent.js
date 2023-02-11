"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointermoveEvent = void 0;
class PointermoveEvent extends Event {
    constructor(inner) {
        super(PointermoveEvent.NAME);
        this.inner = inner;
        this.movementX = inner.movementX || 0;
        this.movementY = inner.movementY || 0;
        this.position = { x: inner.offsetX, y: inner.offsetY };
        this.screen = inner.target.getBoundingClientRect();
    }
}
exports.PointermoveEvent = PointermoveEvent;
PointermoveEvent.NAME = 'pointermove';
//# sourceMappingURL=PointermoveEvent.js.map