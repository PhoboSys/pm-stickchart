"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithdrawEvent = void 0;
class WithdrawEvent extends Event {
    constructor(poolid, pariid, erc20, inner) {
        super(WithdrawEvent.NAME);
        this.inner = inner;
        this.poolid = poolid;
        this.pariid = pariid;
        this.erc20 = erc20;
    }
}
exports.WithdrawEvent = WithdrawEvent;
WithdrawEvent.NAME = 'withdraw';
//# sourceMappingURL=WithdrawEvent.js.map