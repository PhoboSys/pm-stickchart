"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataToValueMappersMap = void 0;
const enum_chartTypes_1 = require("../enums/enum.chartTypes");
const mappers_1 = require("../mappers/");
exports.dataToValueMappersMap = {
    [enum_chartTypes_1.ChartTypes.lines]: mappers_1.pricePointsToValuesDataMapper,
    [enum_chartTypes_1.ChartTypes.candleSticks]: mappers_1.sticksToValuesDataMapper,
};
//# sourceMappingURL=map.dataToValueMappers.js.map