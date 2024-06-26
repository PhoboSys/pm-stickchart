"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoundUnpinEvent = void 0;
class RoundUnpinEvent extends Event {
    constructor(roundid, inner) {
        super(RoundUnpinEvent.NAME);
        this.inner = inner;
        this.roundid = roundid;
    }
}
exports.RoundUnpinEvent = RoundUnpinEvent;
RoundUnpinEvent.NAME = 'roundunpin';
//# sourceMappingURL=PoolUnpinEvent.js.map