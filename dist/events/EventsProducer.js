"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsProducer = void 0;
const _events_1 = require("./index.js");
const _events_2 = require("./index.js");
class EventsProducer {
    constructor(target, canvas, stage) {
        this.target = target;
        this.canvas = canvas;
        this.stage = stage;
        // bind to instance
        this.scroll = (e) => this.target.dispatchEvent(new _events_1.ZoomEvent(e));
        this.error = (e) => this.target.dispatchEvent(new _events_1.CanvasErrorEvent(e));
        this.pointermove = (e) => this.target.dispatchEvent(new _events_2.PointermoveEvent(e));
        this.pointerleave = (e) => this.target.dispatchEvent(new _events_2.PointerleaveEvent(e));
        this.pointerup = (e) => this.target.dispatchEvent(new _events_2.PointerupEvent(e));
        this.pointerdown = (e) => this.target.dispatchEvent(new _events_2.PointerdownEvent(e));
        this.canvas.addEventListener('webglcontextlost', this.error);
        this.stage.addEventListener('wheel', this.scroll);
        this.stage.addEventListener('pointerup', this.pointerup);
        this.stage.addEventListener('pointerdown', this.pointerdown);
        this.stage.addEventListener('pointermove', this.pointermove);
        this.stage.addEventListener('pointerleave', this.pointerleave);
    }
    destroy() {
        this.canvas.removeEventListener('webglcontextlost', this.error);
        this.stage.removeEventListener('wheel', this.scroll);
        this.stage.removeEventListener('pointerup', this.pointerup);
        this.stage.removeEventListener('pointerdown', this.pointerdown);
        this.stage.removeEventListener('pointermove', this.pointermove);
        this.stage.removeEventListener('pointerleave', this.pointerleave);
    }
}
exports.EventsProducer = EventsProducer;
//# sourceMappingURL=EventsProducer.js.map