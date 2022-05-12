"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextureStorage = void 0;
const config_1 = __importDefault(require("../../config"));
const infra_1 = require("../../infra");
const pixi_1 = require("../../lib/pixi");
const symbols_1 = require("./symbols");
const symbols_2 = require("./symbols");
const symbols_3 = require("./symbols");
class TextureStorage {
    constructor(application) {
        this.application = application;
        this.textures = {};
        // pre-create
        this.get(symbols_3.LOCK_ICON_TEXTURE);
    }
    get(name, params) {
        const key = `${name.description}_${JSON.stringify(params)}`;
        if (!this.textures[key]) {
            infra_1.Logger.warn('Create Texture', name);
            if (this[name] instanceof Function) {
                this.textures[key] = this[name](params);
            }
            else {
                infra_1.Logger.warn(Symbol.keyFor(name), 'Texture is not supported create empty');
                this.textures[key] = this.EMPTY();
            }
        }
        return this.textures[key];
    }
    EMPTY() {
        return pixi_1.RenderTexture.create({
            width: this.application.renderer.width,
            height: this.application.renderer.height,
        });
    }
    [symbols_1.UP_WAGET_TEXTURE]() {
        const height = this.application.screen.height;
        const x0 = 0;
        const y0 = 0;
        const x1 = 0;
        const y1 = height;
        const top = '#' + config_1.default.style.upcolor.toString(16).padStart(6, '0');
        const bottom = top + '00'; // same color with opacity = 0
        const gradient = pixi_1.GradientFactory.createLinearGradient(this.application.renderer, pixi_1.RenderTexture.create({
            width: this.application.renderer.width,
            height: this.application.renderer.height,
        }), {
            x0, y0,
            x1, y1,
            colorStops: [
                { color: top, offset: 0 },
                { color: bottom, offset: 1 },
            ],
        });
        return gradient;
    }
    [symbols_1.DOWN_WAGET_TEXTURE]() {
        const height = this.application.screen.height;
        const x0 = 0;
        const y0 = 0;
        const x1 = 0;
        const y1 = height;
        const top = '#' + config_1.default.style.downcolor.toString(16).padStart(6, '0');
        const bottom = top + '00'; // same color with opacity = 0
        const gradient = pixi_1.GradientFactory.createLinearGradient(this.application.renderer, pixi_1.RenderTexture.create({
            width: this.application.renderer.width,
            height: this.application.renderer.height,
        }), {
            x0, y0,
            x1, y1,
            colorStops: [
                { color: top, offset: 0 },
                { color: bottom, offset: 1 },
            ],
        });
        return gradient;
    }
    [symbols_2.PRICE_LINE_TEXTURE]() {
        const x0 = 0;
        const y0 = 0 + this.application.screen.height * config_1.default.padding.top;
        const x1 = 0;
        const y1 = this.application.screen.height;
        const top = '#' + config_1.default.style.linecolor.toString(16).padStart(6, '0');
        const bottom = top + '00'; // same color with opacity = 0
        const { renderer } = this.application;
        const gradient = pixi_1.GradientFactory.createLinearGradient(renderer, pixi_1.RenderTexture.create({
            width: renderer.width,
            height: renderer.height,
        }), {
            x0, y0,
            x1, y1,
            colorStops: [
                { color: top, offset: 0 },
                { color: bottom, offset: 1 },
            ],
        });
        return gradient;
    }
    [symbols_2.POOL_ROUND_TEXTURE]() {
        const { width, height } = this.application.screen;
        const { padding } = config_1.default;
        const x0 = width - width * padding.right - width / 100;
        const y0 = 0 + height * padding.top;
        const x1 = width - width * padding.right + width / 100;
        const y1 = height;
        const topcolor = '#00A573' + '00';
        const middlecolor1 = '#00A573';
        const middlecolor2 = '#F07750';
        const bottomcolor = '#F07750' + '00';
        const { renderer } = this.application;
        const gradient = pixi_1.GradientFactory.createLinearGradient(renderer, pixi_1.RenderTexture.create({
            width: renderer.width,
            height: renderer.height,
        }), {
            x0, y0,
            x1, y1,
            colorStops: [
                { color: topcolor, offset: 0.0 },
                { color: middlecolor1, offset: 0.33 },
                { color: middlecolor2, offset: 0.90 },
                { color: bottomcolor, offset: 1.0 },
            ],
        });
        return gradient;
    }
    [symbols_3.LOCK_ICON_TEXTURE]() {
        const { width, height } = this.application.screen;
        const { padding } = config_1.default;
        const svg = `
        <svg width="113" height="148" viewBox="0 0 113 148" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M98.875 49.3333H91.8125V35.2381C91.8125 15.7867 75.9925 0 56.5 0C37.0075 0 21.1875 15.7867 21.1875 35.2381V49.3333H14.125C6.35625 49.3333 0 55.6762 0 63.4286V133.905C0 141.657 6.35625 148 14.125 148H98.875C106.644 148 113 141.657 113 133.905V63.4286C113 55.6762 106.644 49.3333 98.875 49.3333ZM56.5 112.762C48.7312 112.762 42.375 106.419 42.375 98.6667C42.375 90.9143 48.7312 84.5714 56.5 84.5714C64.2688 84.5714 70.625 90.9143 70.625 98.6667C70.625 106.419 64.2688 112.762 56.5 112.762ZM35.3125 49.3333V35.2381C35.3125 23.539 44.7763 14.0952 56.5 14.0952C68.2237 14.0952 77.6875 23.539 77.6875 35.2381V49.3333H35.3125Z" fill="#303550"/>
        </svg>
        `;
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        return pixi_1.RenderTexture.from(url);
    }
    [symbols_1.SILVER_LEVEL_TEXTURE]({ width, height }) {
        const x0 = 0;
        const y0 = height + height;
        const x1 = width;
        const y1 = 0 - height;
        const gradient = pixi_1.GradientFactory.createLinearGradient(this.application.renderer, pixi_1.RenderTexture.create({ width, height }), {
            x0,
            y0,
            x1,
            y1,
            colorStops: config_1.default.style.levels.silverColors
        });
        return gradient;
    }
    [symbols_1.GOLD_LEVEL_TEXTURE]({ width, height }) {
        const x0 = 0;
        const y0 = height + height;
        const x1 = width;
        const y1 = 0 - height;
        const gradient = pixi_1.GradientFactory.createLinearGradient(this.application.renderer, pixi_1.RenderTexture.create({ width, height }), {
            x0,
            y0,
            x1,
            y1,
            colorStops: config_1.default.style.levels.goldColors
        });
        return gradient;
    }
    [symbols_1.ROYAL_LEVEL_TEXTURE]({ width, height }) {
        const x0 = 0;
        const y0 = height + height;
        const x1 = width;
        const y1 = 0 - height;
        const gradient = pixi_1.GradientFactory.createLinearGradient(this.application.renderer, pixi_1.RenderTexture.create({ width, height }), {
            x0,
            y0,
            x1,
            y1,
            colorStops: config_1.default.style.levels.royalColors,
        });
        return gradient;
    }
}
exports.TextureStorage = TextureStorage;
//# sourceMappingURL=TextureStorage.js.map