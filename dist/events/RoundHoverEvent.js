"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoundHoverEvent = void 0;
class RoundHoverEvent extends Event {
    constructor(roundid, inner) {
        super(RoundHoverEvent.NAME);
        this.inner = inner;
        this.roundid = roundid;
    }
}
exports.RoundHoverEvent = RoundHoverEvent;
RoundHoverEvent.NAME = 'roundhover';
//# sourceMappingURL=RoundHoverEvent.js.map