"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Peek = void 0;
class Peek {
    constructor(max, min, isSmaller) {
        this.max = max;
        this.min = min;
        this.isSmaller = isSmaller;
    }
    changePeek(...values) {
        const { isSmaller } = this;
        for (const value of values) {
            const { max: from, min: to } = this;
            if (!isSmaller(from, value)) {
                this.max = value;
                continue;
            }
            if (isSmaller(to, value)) {
                this.min = value;
                continue;
            }
        }
    }
}
exports.Peek = Peek;
//# sourceMappingURL=utils.peek.js.map