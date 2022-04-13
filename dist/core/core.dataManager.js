"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataManager = void 0;
const utils_peek_1 = require("../utils/utils.peek");
class DataManager {
    constructor(data, valuesDataMapper) {
        this.data = data;
        this.valuesDataMapper = valuesDataMapper;
        this.createValuePeek();
    }
    createValuePeek() {
        const values = this.data.map(this.valuesDataMapper).reduce((acum, el) => [...acum, ...el], []);
        if (values.length < 1)
            return;
        const min = Math.min(...values);
        const max = Math.max(...values);
        const peek = new utils_peek_1.Peek(max, min, (target, value) => target < value);
        this.valuePeek = peek;
    }
    addNext(data) {
        var _a;
        this.data.push(data);
        (_a = this.valuePeek) === null || _a === void 0 ? void 0 : _a.changePeek(...this.valuesDataMapper(data));
    }
}
exports.DataManager = DataManager;
//# sourceMappingURL=core.dataManager.js.map