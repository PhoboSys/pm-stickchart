"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoundUnhoverEvent = void 0;
class RoundUnhoverEvent extends Event {
    constructor(roundid, inner) {
        super(RoundUnhoverEvent.NAME);
        this.inner = inner;
        this.roundid = roundid;
    }
}
exports.RoundUnhoverEvent = RoundUnhoverEvent;
RoundUnhoverEvent.NAME = 'roundunhover';
//# sourceMappingURL=RoundUnhoverEvent.js.map