"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoomEvent = void 0;
const _config_1 = __importDefault(require("../config.js"));
class ZoomEvent extends Event {
    constructor(inner) {
        super(ZoomEvent.NAME);
        this.coefficient = 0.1 * (_config_1.default.zoom.speed / 100);
        this.inner = inner;
        this.zoom = this.coefficient * Math.sign(inner.deltaY);
    }
}
exports.ZoomEvent = ZoomEvent;
ZoomEvent.NAME = 'zoom';
//# sourceMappingURL=ZoomEvent.js.map