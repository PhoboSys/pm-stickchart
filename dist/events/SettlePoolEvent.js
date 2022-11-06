"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettlePoolEvent = void 0;
class SettlePoolEvent extends Event {
    constructor(pool, resolutionPrice, controlPrice, inner) {
        super(SettlePoolEvent.NAME);
        this.pool = pool;
        this.resolutionPrice = resolutionPrice;
        this.controlPrice = controlPrice;
        this.inner = inner;
    }
}
exports.SettlePoolEvent = SettlePoolEvent;
SettlePoolEvent.NAME = 'settlepool';
//# sourceMappingURL=SettlePoolEvent.js.map