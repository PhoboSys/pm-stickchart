"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsProducer = void 0;
const _events_1 = require("./index.js");
const _events_2 = require("./index.js");
class EventsProducer {
    constructor(target, canvas, stage, isMobile) {
        this.target = target;
        this.canvas = canvas;
        this.stage = stage;
        this.isMobile = isMobile;
        // bind to instance
        this.scroll = (e) => this.target.dispatchEvent(new _events_1.ZoomEvent(e));
        this.error = (e) => this.target.dispatchEvent(new _events_1.CanvasErrorEvent(e));
        this.pointermove = (e) => this.target.dispatchEvent(new _events_2.PointermoveEvent(e));
        this.pointerleave = (e) => this.target.dispatchEvent(new _events_2.PointerleaveEvent(e));
        this.pointerup = (e) => this.target.dispatchEvent(new _events_2.PointerupEvent(e));
        this.pointerdown = (e) => this.target.dispatchEvent(new _events_2.PointerdownEvent(e));
        this.touchstart = (e) => {
            if (e.touches.length === 2) {
                this.stage.removeEventListener('pointerup', this.pointerup);
                this.stage.removeEventListener('pointerdown', this.pointerdown);
                this.stage.removeEventListener('pointermove', this.pointermove);
                this.stage.removeEventListener('pointerleave', this.pointerleave);
            }
            return this.target.dispatchEvent(new _events_1.TouchStartEvent(e));
        };
        this.touchzoom = (e) => {
            if (e.touches.length === 2) {
                return this.target.dispatchEvent(new _events_1.TouchZoomEvent(e));
            }
            return false;
        };
        this.touchend = (e) => {
            if (e.touches.length === 0) {
                this.stage.addEventListener('pointerup', this.pointerup);
                this.stage.addEventListener('pointerdown', this.pointerdown);
                this.stage.addEventListener('pointermove', this.pointermove);
                this.stage.addEventListener('pointerleave', this.pointerleave);
                return this.target.dispatchEvent(new _events_1.TouchEndEvent());
            }
            return false;
        };
        this.stage.addEventListener('pointerup', this.pointerup);
        this.stage.addEventListener('pointerdown', this.pointerdown);
        this.stage.addEventListener('pointermove', this.pointermove);
        this.stage.addEventListener('pointerleave', this.pointerleave);
        this.canvas.addEventListener('webglcontextlost', this.error);
        if (this.isMobile) {
            this.stage.addEventListener('touchstart', this.touchstart);
            this.stage.addEventListener('touchmove', this.touchzoom);
            this.stage.addEventListener('touchend', this.touchend);
        }
        else {
            this.stage.addEventListener('wheel', this.scroll);
        }
    }
    destroy() {
        this.stage.removeEventListener('pointerup', this.pointerup);
        this.stage.removeEventListener('pointerdown', this.pointerdown);
        this.stage.removeEventListener('pointermove', this.pointermove);
        this.stage.removeEventListener('pointerleave', this.pointerleave);
        this.canvas.removeEventListener('webglcontextlost', this.error);
        if (this.isMobile) {
            this.stage.removeEventListener('touchstart', this.touchstart);
            this.stage.removeEventListener('touchmove', this.touchzoom);
            this.stage.removeEventListener('touchend', this.touchend);
        }
        else {
            this.stage.removeEventListener('wheel', this.scroll);
        }
    }
}
exports.EventsProducer = EventsProducer;
//# sourceMappingURL=EventsProducer.js.map