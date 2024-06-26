"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoundPinEvent = void 0;
class RoundPinEvent extends Event {
    constructor(roundid, inner) {
        super(RoundPinEvent.NAME);
        this.inner = inner;
        this.roundid = roundid;
    }
}
exports.RoundPinEvent = RoundPinEvent;
RoundPinEvent.NAME = 'roundpin';
//# sourceMappingURL=RoundPinEvent.js.map