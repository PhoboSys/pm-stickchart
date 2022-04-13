"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollEvent = void 0;
class ScrollEvent extends Event {
    constructor(mouseX, mouseY, dragX, dragY) {
        super('scroll');
        this.mouseX = mouseX;
        this.mouseY = mouseY;
        this.dragX = dragX;
        this.dragY = dragY;
    }
}
exports.ScrollEvent = ScrollEvent;
//# sourceMappingURL=utils.scrollEvent.js.map