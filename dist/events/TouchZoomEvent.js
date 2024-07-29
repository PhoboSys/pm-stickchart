"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TouchZoomEvent = void 0;
const calc_utils_1 = require("../lib/calc-utils");
class TouchZoomEvent extends Event {
    constructor(inner) {
        super(TouchZoomEvent.NAME);
        if (inner.touches.length === 2) {
            this.inner = inner;
            const dx = (0, calc_utils_1.sub)(inner.touches[0].clientX, inner.touches[1].clientX);
            const dy = (0, calc_utils_1.sub)(inner.touches[0].clientY, inner.touches[1].clientY);
            const currentDistance = Math.sqrt(Number((0, calc_utils_1.add)((0, calc_utils_1.mul)(dx, dx), (0, calc_utils_1.mul)(dy, dy))));
            this.distance = currentDistance;
            this.screen = inner.target.getBoundingClientRect();
        }
    }
}
exports.TouchZoomEvent = TouchZoomEvent;
TouchZoomEvent.NAME = 'touchzoom';
//# sourceMappingURL=TouchZoomEvent.js.map