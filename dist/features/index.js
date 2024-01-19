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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFeatures = void 0;
__exportStar(require("./types"), exports);
const _config_1 = __importDefault(require("../config.js"));
function createFeatures(features) {
    var _a, _b, _c;
    return {
        rectungedPriceLine: (_a = features === null || features === void 0 ? void 0 : features.rectungedPriceLine) !== null && _a !== void 0 ? _a : _config_1.default.features.rectungedPriceLine,
        curvedResolutionLines: (_b = features === null || features === void 0 ? void 0 : features.curvedResolutionLines) !== null && _b !== void 0 ? _b : _config_1.default.features.curvedResolutionLines,
        pariTileNewDesign: (_c = features === null || features === void 0 ? void 0 : features.pariTileNewDesign) !== null && _c !== void 0 ? _c : _config_1.default.features.pariTileNewDesign,
    };
}
exports.createFeatures = createFeatures;
//# sourceMappingURL=index.js.map