"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaimPariEvent = void 0;
class ClaimPariEvent extends Event {
    constructor(pari, inner) {
        super(ClaimPariEvent.NAME);
        this.inner = inner;
        this.pari = pari;
    }
}
exports.ClaimPariEvent = ClaimPariEvent;
ClaimPariEvent.NAME = 'claimpari';
//# sourceMappingURL=ClaimPariEvent.js.map