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
const symbols_4 = require("./symbols");
const symbols_5 = require("./symbols");
const symbols_6 = require("./symbols");
const symbols_7 = require("./symbols");
class TextureStorage {
    constructor(application) {
        this.application = application;
        this.textures = {};
        this.precreate = [
            symbols_5.LOCK_ICON_TEXTURE,
            symbols_5.UP_ICON_TEXTURE,
            symbols_5.DOWN_ICON_TEXTURE,
            symbols_6.ZERO_ICON_TEXTURE,
        ];
        for (const t of this.precreate)
            this.get(t);
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
        const top = '#' + config_1.default.style.resolution.upcolor.toString(16).padStart(6, '0');
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
        const top = '#' + config_1.default.style.resolution.downcolor.toString(16).padStart(6, '0');
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
        const y0 = 0 + config_1.default.padding.top;
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
    [symbols_7.POOL_CLAIM_TEXTURE]() {
        const x0 = 0;
        const y0 = 0 + config_1.default.padding.top;
        const x1 = 0;
        const y1 = this.application.screen.height;
        const { renderer } = this.application;
        const gradient = pixi_1.GradientFactory.createLinearGradient(renderer, pixi_1.RenderTexture.create({
            width: renderer.width,
            height: renderer.height,
        }), {
            x0, y0,
            x1, y1,
            colorStops: config_1.default.style.poolClaimaColors
        });
        return gradient;
    }
    [symbols_2.POOL_ROUND_TEXTURE]() {
        const x0 = 0;
        const y0 = 0 + config_1.default.padding.top;
        const x1 = 0;
        const y1 = this.application.screen.height;
        const { renderer } = this.application;
        const gradient = pixi_1.GradientFactory.createLinearGradient(renderer, pixi_1.RenderTexture.create({
            width: renderer.width,
            height: renderer.height,
        }), {
            x0, y0,
            x1, y1,
            colorStops: config_1.default.style.poolRoundColors
        });
        return gradient;
    }
    // SVGS
    //
    [symbols_5.LOCK_ICON_TEXTURE]() {
        const svg = `
        <svg width="113" height="148" viewBox="0 0 113 148" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M98.875 49.3333H91.8125V35.2381C91.8125 15.7867 75.9925 0 56.5 0C37.0075 0 21.1875 15.7867 21.1875 35.2381V49.3333H14.125C6.35625 49.3333 0 55.6762 0 63.4286V133.905C0 141.657 6.35625 148 14.125 148H98.875C106.644 148 113 141.657 113 133.905V63.4286C113 55.6762 106.644 49.3333 98.875 49.3333ZM56.5 112.762C48.7312 112.762 42.375 106.419 42.375 98.6667C42.375 90.9143 48.7312 84.5714 56.5 84.5714C64.2688 84.5714 70.625 90.9143 70.625 98.6667C70.625 106.419 64.2688 112.762 56.5 112.762ZM35.3125 49.3333V35.2381C35.3125 23.539 44.7763 14.0952 56.5 14.0952C68.2237 14.0952 77.6875 23.539 77.6875 35.2381V49.3333H35.3125Z" fill="#303550"/>
        </svg>
        `;
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        return pixi_1.RenderTexture.from(url);
    }
    [symbols_5.UP_ICON_TEXTURE]() {
        const svg = `
		<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect width="100" height="100" rx="50" fill="url(#paint0_linear_3734_10563)"/>
			<path d="M37.5125 57.3459L50.6062 44.2522L63.6999 57.3459C65.0161 58.662 67.1421 58.662 68.4582 57.3459C69.7743 56.0298 69.7743 53.9038 68.4582 52.5876L52.9685 37.0979C51.6524 35.7818 49.5263 35.7818 48.2102 37.0979L32.7204 52.5876C31.4043 53.9037 31.4043 56.0298 32.7204 57.3459C34.0366 58.6283 36.1963 58.662 37.5125 57.3459V57.3459Z" fill="white"/>
			<defs>
				<linearGradient id="paint0_linear_3734_10563" x1="1.49012e-06" y1="100" x2="116.569" y2="73.8446" gradientUnits="userSpaceOnUse">
					<stop stop-color="#009797"/>
					<stop offset="1" stop-color="#00A573"/>
				</linearGradient>
			</defs>
		</svg>
        `;
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        return pixi_1.RenderTexture.from(url);
    }
    [symbols_5.DOWN_ICON_TEXTURE]() {
        const svg = `
		<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect x="100" y="100" width="100" height="100" rx="50" transform="rotate(-180 100 100)" fill="url(#paint0_linear_3734_10566)"/>
			<path d="M62.4895 42.6531L49.3957 55.7468L36.302 42.6531C34.9859 41.337 32.8599 41.337 31.5437 42.6531C30.2276 43.9692 30.2276 46.0953 31.5437 47.4114L47.0335 62.9011C48.3496 64.2173 50.4756 64.2173 51.7918 62.9011L67.2815 47.4114C68.5976 46.0953 68.5976 43.9692 67.2815 42.6531C65.9654 41.3707 63.8056 41.337 62.4895 42.6531V42.6531Z" fill="white"/>
			<defs>
				<linearGradient id="paint0_linear_3734_10566" x1="100" y1="200" x2="216.569" y2="173.845" gradientUnits="userSpaceOnUse">
					<stop stop-color="#F05750"/>
					<stop offset="1" stop-color="#F07750"/>
				</linearGradient>
			</defs>
		</svg>
        `;
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        return pixi_1.RenderTexture.from(url);
    }
    [symbols_6.ZERO_ICON_TEXTURE]() {
        const svg = `
		<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect width="100" height="100" rx="50" fill="url(#paint0_linear_1403_836)"/>
			<path d="M69.3491 30.6514C68.4812 29.7829 67.0793 29.7829 66.2114 30.6514L61.0264 35.8399C58.0445 33.5908 54.3282 32.2324 50.3004 32.2324C40.4645 32.2324 32.4979 40.2046 32.4979 50.0473C32.4979 54.0779 33.8554 57.7968 36.1029 60.7808L30.6509 66.2143C29.783 67.0828 29.783 68.4857 30.6509 69.3542C31.096 69.7996 31.6523 70 32.2309 70C32.8095 70 33.3658 69.7773 33.8108 69.3542L39.2184 63.9429C42.267 66.3702 46.1168 67.8399 50.3004 67.8399C60.1363 67.8399 68.1029 59.8678 68.1029 50.0251C68.1029 45.8163 66.6342 41.9638 64.2086 38.9353L69.3491 33.7912C70.217 32.9228 70.217 31.5198 69.3491 30.6514V30.6514ZM36.9485 50.0473C36.9485 42.6764 42.9346 36.6862 50.3004 36.6862C53.1043 36.6862 55.6857 37.5546 57.8442 39.0244L39.2851 57.5964C37.8164 55.4586 36.9485 52.8532 36.9485 50.0473ZM63.6523 50.0473C63.6523 57.4182 57.6662 63.4085 50.3004 63.4085C47.3407 63.4085 44.6036 62.4287 42.3783 60.7808L61.0264 42.1197C62.6732 44.3466 63.6523 47.0633 63.6523 50.0473V50.0473Z" fill="white"/>
			<defs>
				<linearGradient id="paint0_linear_1403_836" x1="1.49012e-06" y1="100" x2="116.569" y2="73.8446" gradientUnits="userSpaceOnUse">
					<stop stop-color="#007397"/>
					<stop offset="1" stop-color="#009797"/>
				</linearGradient>
			</defs>
		</svg>
        `;
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        return pixi_1.RenderTexture.from(url);
    }
    //
    [symbols_6.UNDEFINED_ICON_TEXTURE]() {
        const svg = `
        <svg width="113" height="148" viewBox="0 0 113 148" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M98.875 49.3333H91.8125V35.2381C91.8125 15.7867 75.9925 0 56.5 0C37.0075 0 21.1875 15.7867 21.1875 35.2381V49.3333H14.125C6.35625 49.3333 0 55.6762 0 63.4286V133.905C0 141.657 6.35625 148 14.125 148H98.875C106.644 148 113 141.657 113 133.905V63.4286C113 55.6762 106.644 49.3333 98.875 49.3333ZM56.5 112.762C48.7312 112.762 42.375 106.419 42.375 98.6667C42.375 90.9143 48.7312 84.5714 56.5 84.5714C64.2688 84.5714 70.625 90.9143 70.625 98.6667C70.625 106.419 64.2688 112.762 56.5 112.762ZM35.3125 49.3333V35.2381C35.3125 23.539 44.7763 14.0952 56.5 14.0952C68.2237 14.0952 77.6875 23.539 77.6875 35.2381V49.3333H35.3125Z" fill="#303550"/>
        </svg>
        `;
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        return pixi_1.RenderTexture.from(url);
    }
    [symbols_4.SILVER_LEVEL_TEXTURE]({ width, height }) {
        const x0 = 0;
        const y0 = height + height;
        const x1 = width;
        const y1 = 0;
        const gradient = pixi_1.GradientFactory.createLinearGradient(this.application.renderer, pixi_1.RenderTexture.create({ width, height }), {
            x0,
            y0,
            x1,
            y1,
            colorStops: config_1.default.style.levels.silverColors
        });
        return gradient;
    }
    [symbols_4.GOLD_LEVEL_TEXTURE]({ width, height }) {
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
    [symbols_4.ROYAL_LEVEL_TEXTURE]({ width, height }) {
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
    [symbols_3.RESOLUTION_COUNTDOWN_TEXTURE]() {
        const { width, height } = this.application.screen;
        const x0 = 0;
        const y0 = 0;
        const x1 = 0;
        const y1 = height;
        const renderer = this.application.renderer;
        const gradient = pixi_1.GradientFactory.createLinearGradient(renderer, pixi_1.RenderTexture.create({ width, height }), {
            x0,
            y0,
            x1,
            y1,
            colorStops: config_1.default.style.resolutionCountdownColors,
        });
        return gradient;
    }
    [symbols_3.LOCK_COUNTDOWN_TEXTURE]() {
        const { width, height } = this.application.screen;
        const x0 = 0;
        const y0 = 0;
        const x1 = 0;
        const y1 = height;
        const renderer = this.application.renderer;
        const gradient = pixi_1.GradientFactory.createLinearGradient(renderer, pixi_1.RenderTexture.create({ width, height }), {
            x0,
            y0,
            x1,
            y1,
            colorStops: config_1.default.style.lockCountdownColors,
        });
        return gradient;
    }
}
exports.TextureStorage = TextureStorage;
//# sourceMappingURL=TextureStorage.js.map