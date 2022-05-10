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
        this.mousemove = (e) => this.target.dispatchEvent(new _1.MousemoveEvent(e));
        this.mouseleave = (e) => this.target.dispatchEvent(new _1.MouseleaveEvent(e));
        this.canvas.addEventListener('webglcontextlost', this.error);
        this.stage.addEventListener('wheel', this.scroll);
        this.stage.addEventListener('mousemove', this.mousemove);
        this.stage.addEventListener('mouseleave', this.mouseleave);
    }
    destroy() {
        this.canvas.removeEventListener('webglcontextlost', this.error);
        this.stage.removeEventListener('wheel', this.scroll);
        this.stage.removeEventListener('mousemove', this.mousemove);
        this.stage.removeEventListener('mouseleave', this.mouseleave);
    }
}
exports.EventsProducer = EventsProducer;
//# sourceMappingURL=EventsProducer.js.map