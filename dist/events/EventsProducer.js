"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsProducer = void 0;
const _1 = require(".");
class EventsProducer {
    constructor(target, canvas, stage) {
        this.target = target;
        this.canvas = canvas;
        this.stage = stage;
        // bind to instance
        this.scroll = (e) => this.target.dispatchEvent(new _1.ZoomEvent(e));
        this.error = (e) => this.target.dispatchEvent(new _1.CanvasErrorEvent(e));
        this.pointermove = (e) => this.target.dispatchEvent(new _1.PointermoveEvent(e));
        this.pointerleave = (e) => this.target.dispatchEvent(new _1.PointerleaveEvent(e));
        this.canvas.addEventListener('webglcontextlost', this.error);
        this.stage.addEventListener('wheel', this.scroll);
        this.stage.addEventListener('pointermove', this.pointermove);
        this.stage.addEventListener('pointerleave', this.pointerleave);
    }
    destroy() {
        this.canvas.removeEventListener('webglcontextlost', this.error);
        this.stage.removeEventListener('wheel', this.scroll);
        this.stage.addEventListener('pointermove', this.pointermove);
    }
}
exports.EventsProducer = EventsProducer;
//# sourceMappingURL=EventsProducer.js.map