"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointertapEvent = void 0;
class PointertapEvent extends Event {
    constructor(inner) {
        super(PointertapEvent.NAME);
        this.inner = inner;
        this.position = { x: inner.offsetX, y: inner.offsetY };
    }
}
exports.PointertapEvent = PointertapEvent;
PointertapEvent.NAME = 'pointertap';
//# sourceMappingURL=PointertapEvent.js.map