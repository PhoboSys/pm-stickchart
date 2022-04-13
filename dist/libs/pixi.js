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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = void 0;
__exportStar(require("@pixi/constants"), exports);
__exportStar(require("@pixi/math"), exports);
__exportStar(require("@pixi/runner"), exports);
__exportStar(require("@pixi/settings"), exports);
__exportStar(require("@pixi/ticker"), exports);
__exportStar(require("@pixi/core"), exports);
__exportStar(require("@pixi/app"), exports);
__exportStar(require("@pixi/graphics"), exports);
exports.utils = __importStar(require("@pixi/utils"));
const app_1 = require("@pixi/app");
const core_1 = require("@pixi/core");
core_1.Renderer.registerPlugin('batch', core_1.BatchRenderer);
const ticker_1 = require("@pixi/ticker");
app_1.Application.registerPlugin(ticker_1.TickerPlugin);
//# sourceMappingURL=pixi.js.map