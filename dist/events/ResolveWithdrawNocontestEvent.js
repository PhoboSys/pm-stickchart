"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolveWithdrawNocontestEvent = void 0;
class ResolveWithdrawNocontestEvent extends Event {
    constructor(roundid, predictionid, erc20, inner) {
        super(ResolveWithdrawNocontestEvent.NAME);
        this.roundid = roundid;
        this.predictionid = predictionid;
        this.erc20 = erc20;
        this.inner = inner;
    }
}
exports.ResolveWithdrawNocontestEvent = ResolveWithdrawNocontestEvent;
ResolveWithdrawNocontestEvent.NAME = 'resolvewithdrawnocontest';
//# sourceMappingURL=ResolveWithdrawNocontestEvent.js.map