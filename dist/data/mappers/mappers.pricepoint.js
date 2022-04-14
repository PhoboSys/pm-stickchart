"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rawToPricePointsDataMapper = exports.rawNewToPricePointsDataMapper = exports.singleRawToPricePointDataMapper = exports.pricePointsToValuesDataMapper = void 0;
const pricePointsToValuesDataMapper = (pricePoints) => {
    return [pricePoints.price];
};
exports.pricePointsToValuesDataMapper = pricePointsToValuesDataMapper;
const singleRawToPricePointDataMapper = (data) => {
    const { blockTimestamp, answer, aggrigator, } = data;
    return {
        date: new Date(blockTimestamp * 1000),
        price: answer,
        aggrigator,
    };
};
exports.singleRawToPricePointDataMapper = singleRawToPricePointDataMapper;
const rawNewToPricePointsDataMapper = (pricePoints, raw) => {
    const pricePoint = (0, exports.singleRawToPricePointDataMapper)(raw);
    return [...pricePoints, pricePoint];
};
exports.rawNewToPricePointsDataMapper = rawNewToPricePointsDataMapper;
const rawToPricePointsDataMapper = (data) => {
    return data.map(exports.singleRawToPricePointDataMapper);
};
exports.rawToPricePointsDataMapper = rawToPricePointsDataMapper;
//# sourceMappingURL=mappers.pricepoint.js.map