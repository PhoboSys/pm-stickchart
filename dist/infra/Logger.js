"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const debug_1 = __importDefault(require("debug"));
class Logger {
    static info(...args) {
        Logger.debuginfo(...args);
    }
    static error(...args) {
        Logger.debugerror(...args);
        console.error(...args); // eslint-disable-line
    }
    static warn(...args) {
        Logger.debugwarn(...args);
    }
}
exports.Logger = Logger;
Logger.ns = 'pm:';
Logger.debuginfo = (0, debug_1.default)(Logger.ns + ':info');
Logger.debugwarn = (0, debug_1.default)(Logger.ns + ':error');
Logger.debugerror = (0, debug_1.default)(Logger.ns + ':warn');
//# sourceMappingURL=Logger.js.map