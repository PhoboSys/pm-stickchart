"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolveWithdrawEvent = void 0;
class ResolveWithdrawEvent extends Event {
    constructor(roundid, pariid, erc20, resolutionPrice, controlPrice, inner) {
        super(ResolveWithdrawEvent.NAME);
        this.roundid = roundid;
        this.pariid = pariid;
        this.erc20 = erc20;
        this.resolutionPrice = resolutionPrice;
        this.controlPrice = controlPrice;
        this.inner = inner;
    }
}
exports.ResolveWithdrawEvent = ResolveWithdrawEvent;
ResolveWithdrawEvent.NAME = 'resolvewithdraw';
//# sourceMappingURL=ResolveWithdrawEvent.js.map