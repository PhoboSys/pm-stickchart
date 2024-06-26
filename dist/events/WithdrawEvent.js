"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithdrawEvent = void 0;
class WithdrawEvent extends Event {
    constructor(roundid, predictionid, erc20, inner) {
        super(WithdrawEvent.NAME);
        this.inner = inner;
        this.roundid = roundid;
        this.predictionid = predictionid;
        this.erc20 = erc20;
    }
}
exports.WithdrawEvent = WithdrawEvent;
WithdrawEvent.NAME = 'withdraw';
//# sourceMappingURL=WithdrawEvent.js.map