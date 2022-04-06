"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addScrollEvent = void 0;
let isMouseDown = false;
const addScrollEvent = (element, handler) => {
    element.onmousedown = () => {
        isMouseDown = true;
    };
    element.onmouseup = () => {
        isMouseDown = false;
    };
    element.onmousemove = (ev) => {
        if (!isMouseDown)
            return;
        handler(ev);
    };
};
exports.addScrollEvent = addScrollEvent;
//# sourceMappingURL=utils.addScrollEvent.js.map