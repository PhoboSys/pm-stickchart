"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultIntervalRowSize = exports.defaultChartValueRange = exports.defaultStickIntervalSize = exports.defaultColumnIntervalSize = exports.defaultChartDateRange = exports.defaultStickChartData = exports.defaultInputEvent = exports.defaultStickChartStyle = void 0;
const moment_1 = __importStar(require("moment"));
const enum_inputEventTypes_1 = require("./data/enums/enum.inputEventTypes");
const utils_inputEvent_1 = require("./utils/utils.inputEvent");
const utils_range_1 = require("./utils/utils.range");
exports.defaultStickChartStyle = {
    backgroundColor: 0x303134,
    backgroundOpacity: 1,
    gridColor: 0xFFFFFF,
    gridOpacity: 0.1,
    gridWidth: 1,
    increaseColor: 0x4CAF50,
    decreaseColor: 0xF05350,
    stickRound: 20,
    lineColor: 0x4CAF50,
};
exports.defaultInputEvent = new utils_inputEvent_1.ChartInputEvent(null, enum_inputEventTypes_1.InputEventTypes.none);
exports.defaultStickChartData = [];
const defaultChartDateRange = () => new utils_range_1.DateRange((0, moment_1.default)().subtract(10, 'minutes'), (0, moment_1.default)().add(10, 'minutes'));
exports.defaultChartDateRange = defaultChartDateRange;
exports.defaultColumnIntervalSize = (0, moment_1.duration)(1, 'minute');
exports.defaultStickIntervalSize = (0, moment_1.duration)(20, 'seconds');
exports.defaultChartValueRange = new utils_range_1.ValueRange(0, 10);
exports.defaultIntervalRowSize = 1;
//# sourceMappingURL=defaults.js.map