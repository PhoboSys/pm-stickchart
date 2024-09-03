"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TouchStartEvent = void 0;
class TouchStartEvent extends Event {
    constructor(inner) {
        super(TouchStartEvent.NAME);
        this.multitouch = false;
        this.multitouch = inner.touches.length === 2;
    }
}
exports.TouchStartEvent = TouchStartEvent;
TouchStartEvent.NAME = 'touchstart';
//# sourceMappingURL=TouchStartEvent.js.map