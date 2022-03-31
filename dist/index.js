"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StickChart = exports.Application = exports.ValueRange = exports.CandleStick = exports.Grid = exports.DateRange = void 0;
var date_range_1 = require("./utils/date_range");
Object.defineProperty(exports, "DateRange", { enumerable: true, get: function () { return date_range_1.DateRange; } });
var grid_1 = require("./components/grid");
Object.defineProperty(exports, "Grid", { enumerable: true, get: function () { return grid_1.Grid; } });
var candle_stick_1 = require("./components/candle_stick");
Object.defineProperty(exports, "CandleStick", { enumerable: true, get: function () { return candle_stick_1.CandleStick; } });
var value_range_1 = require("./utils/value_range");
Object.defineProperty(exports, "ValueRange", { enumerable: true, get: function () { return value_range_1.ValueRange; } });
var app_1 = require("@pixi/app");
Object.defineProperty(exports, "Application", { enumerable: true, get: function () { return app_1.Application; } });
class StickChart {
    constructor({ width, height, dateRange, segmentDateInterval: segmentInterval, stickDateInterval: stickInterval }) {
        this.width = width;
        this.height = height;
        this.dateRange = dateRange;
        this.segmentInterval = segmentInterval;
        this.stickInterval = stickInterval;
    }
}
exports.StickChart = StickChart;
//# sourceMappingURL=index.js.map