"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rawToPricePointsDataMapper = exports.singleRawToPricePointDataMapper = void 0;
const singleRawToPricePointDataMapper = (data) => {
    const { blockTimestamp, answer, aggrigator, } = data;
    return {
        date: new Date(blockTimestamp * 1000),
        price: answer,
        aggrigator,
    };
};
exports.singleRawToPricePointDataMapper = singleRawToPricePointDataMapper;
const rawToPricePointsDataMapper = (data) => {
    return data.map(exports.singleRawToPricePointDataMapper);
};
exports.rawToPricePointsDataMapper = rawToPricePointsDataMapper;
//# sourceMappingURL=mapper.rawToPricePoint.js.map