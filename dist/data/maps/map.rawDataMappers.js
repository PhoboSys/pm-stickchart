"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rawDataMappersMap = void 0;
const enum_chartTypes_1 = require("../enums/enum.chartTypes");
const mappers_1 = require("../mappers");
exports.rawDataMappersMap = {
    [enum_chartTypes_1.ChartTypes.lines]: mappers_1.rawToPricePointsDataMapper,
    [enum_chartTypes_1.ChartTypes.candleSticks]: mappers_1.rawToSticksDataMapper,
};
//# sourceMappingURL=map.rawDataMappers.js.map