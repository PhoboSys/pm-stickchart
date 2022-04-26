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
    getPoolRoundGradient() {
        if (!this.textires[TextureStorage.POOL_ROUND_TEXTURE]) {
            infra_1.Logger.warn('Create POOL_ROUND_TEXTURE Texture');
            this.textires[TextureStorage.POOL_ROUND_TEXTURE] = this.createPoolRoundTexture();
        }
        return this.textires[TextureStorage.POOL_ROUND_TEXTURE];
    }
    createPriceLineTexture() {
        const x0 = 0;
        const y0 = 0 + this.application.screen.height * config_1.default.padding.top;
        const x1 = 0;
        const y1 = this.application.screen.height;
        const top = '#' + config_1.default.style.linecolor.toString(16).padStart(6, '0');
        const bottom = top + '00'; // same color with opacity = 0
        const gradient = pixi_1.GradientFactory.createLinearGradient(this.application.renderer, pixi_1.RenderTexture.create({
            width: this.application.renderer.width,
            height: this.application.renderer.height
        }), {
            x0, y0,
            x1, y1,
            colorStops: [
                { color: top, offset: 0 },
                { color: bottom, offset: 1 },
            ]
        });
        return gradient;
    }
    createPoolRoundTexture() {
        const { width, height } = this.application.screen;
        const { padding } = config_1.default;
        const x0 = width - width * padding.right - width / 100;
        const y0 = 0 + height * padding.top;
        const x1 = width - width * padding.right + width / 100;
        const y1 = height - height * padding.bottom;
        const topcolor = '#00A573' + '00';
        const middlecolor1 = '#00A573';
        const middlecolor2 = '#F07750';
        const bottomcolor = '#F07750' + '00';
        const gradient = pixi_1.GradientFactory.createLinearGradient(this.application.renderer, pixi_1.RenderTexture.create({
            width: this.application.renderer.width,
            height: this.application.renderer.height
        }), {
            x0, y0,
            x1, y1,
            colorStops: [
                { color: topcolor, offset: 0.0 },
                { color: middlecolor1, offset: 0.33 },
                { color: middlecolor2, offset: 0.66 },
                { color: bottomcolor, offset: 1.0 },
            ]
        });
        return gradient;
    }
}
exports.TextureStorage = TextureStorage;
TextureStorage.PRICE_LINE_TEXTURE = Symbol('PRICE_LINE_TEXTURE');
TextureStorage.POOL_ROUND_TEXTURE = Symbol('POOL_ROUND_TEXTURE');
//# sourceMappingURL=TextureStorage.js.map