"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolHoverEvent = void 0;
class PoolHoverEvent extends Event {
    constructor(poolid, inner) {
        super(PoolHoverEvent.NAME);
        this.inner = inner;
        this.poolid = poolid;
    }
}
exports.PoolHoverEvent = PoolHoverEvent;
PoolHoverEvent.NAME = 'poolhover';
//# sourceMappingURL=PoolHoverEvent.js.map