"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaimPariEvent = void 0;
class ClaimPariEvent extends Event {
    constructor(pariid, erc20, inner) {
        super(ClaimPariEvent.NAME);
        this.inner = inner;
        this.pariid = pariid;
        this.erc20 = erc20;
    }
}
exports.ClaimPariEvent = ClaimPariEvent;
ClaimPariEvent.NAME = 'claimpari';
//# sourceMappingURL=ClaimPariEvent.js.map