"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addScrollEvent = void 0;
const utils_scrollEvent_1 = require("./utils.scrollEvent");
const isMouseDown = false;
let mouseDownEvent = null;
const addScrollEvent = (element, handler) => {
    element.onmousedown = (ev) => {
        mouseDownEvent = ev;
    };
    element.onmouseup = () => {
        mouseDownEvent = null;
    };
    element.onmouseleave = () => {
        mouseDownEvent = null;
    };
    element.onmousemove = (ev) => {
        if (mouseDownEvent === null)
            return;
        const scrollEvent = new utils_scrollEvent_1.ScrollEvent(mouseDownEvent.clientX, mouseDownEvent.clientY, ev.clientX, ev.clientX);
        handler(scrollEvent);
    };
};
exports.addScrollEvent = addScrollEvent;
//# sourceMappingURL=utils.addScrollEvent.js.map