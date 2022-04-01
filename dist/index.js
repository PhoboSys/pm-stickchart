"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StickChart = exports.Application = exports.CandleStick = exports.Grid = exports.ValueRange = exports.DateRange = void 0;
var utils_1 = require("./utils");
Object.defineProperty(exports, "DateRange", { enumerable: true, get: function () { return utils_1.DateRange; } });
Object.defineProperty(exports, "ValueRange", { enumerable: true, get: function () { return utils_1.ValueRange; } });
var components_1 = require("./components");
Object.defineProperty(exports, "Grid", { enumerable: true, get: function () { return components_1.Grid; } });
Object.defineProperty(exports, "CandleStick", { enumerable: true, get: function () { return components_1.CandleStick; } });
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