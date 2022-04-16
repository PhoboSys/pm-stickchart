"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartInputEvent = void 0;
const enums_1 = require("../data/enums");
class ChartInputEvent {
    constructor(event, type) {
        this.event = event;
        this.type = type;
    }
    markAsHandled() {
        this.type = enums_1.InputEventTypes.none;
    }
    preventDefault() {
        const { event } = this;
        if (!(event instanceof Event))
            return;
        event.preventDefault();
    }
}
exports.ChartInputEvent = ChartInputEvent;
//# sourceMappingURL=utils.inputEvent.js.map