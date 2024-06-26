"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateData = void 0;
class StateData {
    constructor(onStateChange) {
        this.onStateChange = onStateChange;
        this.pinnedRoundid = null;
    }
    setPinnedRoundid(roundid) {
        this.update('pinnedRoundid', roundid);
    }
    update(path, data) {
        this[path] = data;
        this.onStateChange();
    }
}
exports.StateData = StateData;
//# sourceMappingURL=index.js.map