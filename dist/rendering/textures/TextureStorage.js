"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextureStorage = void 0;
const infra_1 = require("../../infra");
const config_1 = __importDefault(require("../../config"));
const pixi_1 = require("../../lib/pixi");
class TextureStorage {
    constructor(application) {
        this.application = application;
        this.textires = {};
    }
    getPriceLineGradient() {
        if (!this.textires[TextureStorage.PRICE_LINE_TEXTURE]) {
            infra_1.Logger.warn('Create PRICE_LINE_TEXTURE Texture');
            this.textires[TextureStorage.PRICE_LINE_TEXTURE] = this.createPriceLineTexture();
        }
        return this.textires[TextureStorage.PRICE_LINE_TEXTURE];
    }
    createPriceLineTexture() {
        console.log(this.application.screen.height * config_1.default.padding.top);
        const x0 = 0;
        const y0 = 0 + this.application.screen.height * config_1.default.padding.top;
        const x1 = 0;
        const y1 = this.application.screen.height;
        const gradient = pixi_1.GradientFactory.createLinearGradient(this.application.renderer, pixi_1.RenderTexture.create({
            width: this.application.renderer.width,
            height: this.application.renderer.height
        }), {
            x0, y0,
            x1, y1,
            colorStops: [
                { color: 0x009797, offset: 0 },
                { color: 0x22273f, offset: 1 },
            ]
        });
        return gradient;
    }
}
exports.TextureStorage = TextureStorage;
TextureStorage.PRICE_LINE_TEXTURE = Symbol('PRICE_LINE_TEXTURE');
//# sourceMappingURL=TextureStorage.js.map