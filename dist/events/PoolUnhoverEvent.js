"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolUnhoverEvent = void 0;
class PoolUnhoverEvent extends Event {
    constructor(poolid, inner) {
        super(PoolUnhoverEvent.NAME);
        this.inner = inner;
        this.poolid = poolid;
    }
}
exports.PoolUnhoverEvent = PoolUnhoverEvent;
PoolUnhoverEvent.NAME = 'poolunhover';
//# sourceMappingURL=PoolUnhoverEvent.js.map