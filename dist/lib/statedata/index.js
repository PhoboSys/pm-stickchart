"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateData = void 0;
class StateData {
    constructor(onStateChange) {
        this.onStateChange = onStateChange;
        this.pinnedPoolid = null;
    }
    setPinnedPoolid(poolid) {
        this.update('pinnedPoolid', poolid);
    }
    update(path, data) {
        this[path] = data;
        this.onStateChange();
    }
}
exports.StateData = StateData;
//# sourceMappingURL=index.js.map