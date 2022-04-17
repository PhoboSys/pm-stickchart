"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pricePointToDateMapper = exports.rawToPricePointsDataMapper = exports.rawNewToPricePointsDataMapper = exports.singleRawToPricePointDataMapper = exports.pricePointsToPricesDataMapper = void 0;
const pricePointsToPricesDataMapper = (pricePoints) => {
    return [pricePoints.price];
};
exports.pricePointsToPricesDataMapper = pricePointsToPricesDataMapper;
const singleRawToPricePointDataMapper = (data) => {
    const { blockTimestamp, answer, } = data;
    return {
        date: new Date(blockTimestamp * 1000),
        price: answer,
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
const pricePointToDateMapper = (pricePoint) => {
    return pricePoint.date.valueOf();
};
exports.pricePointToDateMapper = pricePointToDateMapper;
//# sourceMappingURL=mappers.pricepoint.js.map