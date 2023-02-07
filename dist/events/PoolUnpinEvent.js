"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolUnpinEvent = void 0;
class PoolUnpinEvent extends Event {
    constructor(poolid, inner) {
        super(PoolUnpinEvent.NAME);
        this.inner = inner;
        this.poolid = poolid;
    }
}
exports.PoolUnpinEvent = PoolUnpinEvent;
PoolUnpinEvent.NAME = 'poolunpin';
//# sourceMappingURL=PoolUnpinEvent.js.map