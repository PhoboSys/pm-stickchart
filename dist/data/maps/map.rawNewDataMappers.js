"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newRawDataMappersMap = void 0;
const enum_chartTypes_1 = require("../enums/enum.chartTypes");
const mappers_1 = require("../mappers");
exports.newRawDataMappersMap = {
    [enum_chartTypes_1.ChartTypes.lines]: mappers_1.rawNewToPricePointsDataMapper,
    [enum_chartTypes_1.ChartTypes.candleSticks]: mappers_1.rawNewToSticksDataMapper,
};
//# sourceMappingURL=map.rawNewDataMappers.js.map