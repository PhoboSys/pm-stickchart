"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartInputEvent = void 0;
const enums_1 = require("../data/enums");
const utils_1 = require("../utils");
class ChartInputEvent {
    constructor(event, type) {
        this.event = event;
        this.type = type;
    }
    markAsHandled() {
        this.event = new utils_1.HandledEvent();
        this.type = enums_1.InputEventTypes.none;
    }
    preventDefault() {
        const { event } = this;
        if (!(event instanceof Event))
            return;
        event.preventDefault();
    }
    clone() {
        return new ChartInputEvent(Object.assign({}, this.event), this.type);
    }
}
exports.ChartInputEvent = ChartInputEvent;
//# sourceMappingURL=core.inputEvent.js.map