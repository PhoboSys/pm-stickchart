"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolPinEvent = void 0;
class PoolPinEvent extends Event {
    constructor(poolid, inner) {
        super(PoolPinEvent.NAME);
        this.inner = inner;
        this.poolid = poolid;
    }
}
exports.PoolPinEvent = PoolPinEvent;
PoolPinEvent.NAME = 'pooltap';
//# sourceMappingURL=PoolTapEvent.js.map