"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextureStorage = void 0;
const _config_1 = __importDefault(require("../../config.js"));
const _infra_1 = require("../../infra/index.js");
const pixi_1 = require("../../lib/pixi");
const symbols_1 = require("./symbols");
const symbols_2 = require("./symbols");
const symbols_3 = require("./symbols");
const symbols_4 = require("./symbols");
const symbols_5 = require("./symbols");
const symbols_6 = require("./symbols");
const symbols_7 = require("./symbols");
const symbols_8 = require("./symbols");
class TextureStorage {
    constructor(application) {
        this.application = application;
        this.textures = {};
        this.precreate = [
            symbols_5.LOCK_ICON_TEXTURE,
            symbols_5.UP_ICON_TEXTURE,
            symbols_5.DOWN_ICON_TEXTURE,
            symbols_6.ZERO_ICON_TEXTURE,
            symbols_1.ETH_DARK_TEXTURE,
            symbols_1.USDC_DARK_TEXTURE,
            symbols_1.USDT_DARK_TEXTURE,
            symbols_1.UNKNOWN_DARK_TEXTURE,
        ];
        for (const t of this.precreate)
            this.get(t);
    }
    get(name, params) {
        const key = `${name.description}_${JSON.stringify(params)}`;
        if (!this.textures[key]) {
            _infra_1.Logger.warn('Create Texture', name);
            if (this[name] instanceof Function) {
                this.textures[key] = this[name](params);
            }
            else {
                _infra_1.Logger.warn(Symbol.keyFor(name), 'Texture is not supported create empty');
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
        const top = '#' + _config_1.default.style.resolution.upcolor.toString(16).padStart(6, '0');
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
        const top = '#' + _config_1.default.style.resolution.downcolor.toString(16).padStart(6, '0');
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
        const y0 = 0 + _config_1.default.padding.top;
        const x1 = 0;
        const y1 = this.application.screen.height;
        const top = '#' + _config_1.default.style.linecolor.toString(16).padStart(6, '0');
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
    [symbols_8.POOL_CLAIM_TEXTURE]() {
        const x0 = 0;
        const y0 = 0 + _config_1.default.padding.top;
        const x1 = 0;
        const y1 = this.application.screen.height;
        const { renderer } = this.application;
        const gradient = pixi_1.GradientFactory.createLinearGradient(renderer, pixi_1.RenderTexture.create({
            width: renderer.width,
            height: renderer.height,
        }), {
            x0, y0,
            x1, y1,
            colorStops: _config_1.default.style.poolClaimaColors
        });
        return gradient;
    }
    [symbols_2.POOL_ROUND_TEXTURE]() {
        const x0 = 0;
        const y0 = 0 + _config_1.default.padding.top;
        const x1 = 0;
        const y1 = this.application.screen.height;
        const { renderer } = this.application;
        const gradient = pixi_1.GradientFactory.createLinearGradient(renderer, pixi_1.RenderTexture.create({
            width: renderer.width,
            height: renderer.height,
        }), {
            x0, y0,
            x1, y1,
            colorStops: _config_1.default.style.poolRoundColors
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
                <rect width="100" height="100" rx="50" fill="url(#paint0_linear_4046_11916)"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M25.405 47.3919C23.9642 47.3919 22.7962 48.5599 22.7962 50.0007C22.7963 51.4413 23.9643 52.6092 25.4049 52.6094L31.0472 52.6093C31.5939 56.6032 33.4024 60.4575 36.4727 63.5279C43.9436 70.9988 56.0564 70.9988 63.5273 63.5279C66.5976 60.4575 68.4061 56.6032 68.9528 52.6093L74.5951 52.6094C76.0357 52.6092 77.2037 51.4413 77.2038 50.0007C77.2038 48.5599 76.0358 47.3919 74.595 47.3919L68.9528 47.3919C68.4061 43.3979 66.5976 39.5437 63.5273 36.4733C56.0564 29.0024 43.9436 29.0024 36.4727 36.4733C33.4024 39.5437 31.5939 43.3979 31.0472 47.3919L25.405 47.3919ZM36.3324 52.6092C36.8354 55.2579 38.1119 57.7886 40.162 59.8386C45.5954 65.272 54.4046 65.272 59.838 59.8386C61.8881 57.7886 63.1646 55.2579 63.6677 52.6094L36.3324 52.6092ZM63.6677 47.3919L36.3323 47.3919C36.8354 44.7433 38.1119 42.2127 40.162 40.1626C45.5954 34.7292 54.4046 34.7292 59.838 40.1626C61.8881 42.2127 63.1646 44.7433 63.6677 47.3919Z" fill="#303550"/>
                <defs>
                <linearGradient id="paint0_linear_4046_11916" x1="1.27458e-06" y1="100" x2="90.6146" y2="89.3081" gradientUnits="userSpaceOnUse">
                <stop stop-color="#B7BDD7"/>
                <stop offset="1" stop-color="#E9EDFF"/>
                </linearGradient>
                </defs>
            </svg>
        `;
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        return pixi_1.RenderTexture.from(url);
    }
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
    // Gradients
    [symbols_7.GRADIENT_TEXTURE]({ width, height, points, colorStops }) {
        const [x0, y0, x1, y1] = points;
        const gradient = pixi_1.GradientFactory.createLinearGradient(this.application.renderer, pixi_1.RenderTexture.create({ width, height }), {
            x0, y0,
            x1, y1,
            colorStops
        });
        return gradient;
    }
    [symbols_4.SILVER_LEVEL_TEXTURE]({ width, height }) {
        const x0 = 0;
        const y0 = height + height;
        const x1 = width;
        const y1 = 0 - height;
        const gradient = pixi_1.GradientFactory.createLinearGradient(this.application.renderer, pixi_1.RenderTexture.create({ width, height }), {
            x0, y0,
            x1, y1,
            colorStops: _config_1.default.style.levels.silverColors
        });
        return gradient;
    }
    [symbols_4.GOLD_LEVEL_TEXTURE]({ width, height }) {
        const x0 = 0;
        const y0 = height + height;
        const x1 = width;
        const y1 = 0 - height;
        const gradient = pixi_1.GradientFactory.createLinearGradient(this.application.renderer, pixi_1.RenderTexture.create({ width, height }), {
            x0, y0,
            x1, y1,
            colorStops: _config_1.default.style.levels.goldColors
        });
        return gradient;
    }
    [symbols_4.ROYAL_LEVEL_TEXTURE]({ width, height }) {
        const x0 = 0;
        const y0 = height + height;
        const x1 = width;
        const y1 = 0 - height;
        const gradient = pixi_1.GradientFactory.createLinearGradient(this.application.renderer, pixi_1.RenderTexture.create({ width, height }), {
            x0, y0,
            x1, y1,
            colorStops: _config_1.default.style.levels.royalColors,
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
            x0, y0,
            x1, y1,
            colorStops: _config_1.default.style.resolutionCountdownColors,
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
            x0, y0,
            x1, y1,
            colorStops: _config_1.default.style.lockCountdownColors,
        });
        return gradient;
    }
    [symbols_1.ETH_DARK_TEXTURE]() {
        const svg = `
            <svg width="100" height="160" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M4.99884 9.94937e-05L4.9989 0V0.000198987L9.99736 8.14821L9.99768 8.14835L9.99751 8.14845L9.99768 8.14873L9.99731 8.14857L4.9989 11.0502V11.0503L4.99884 11.0502L4.99878 11.0503V11.0502L0.000368504 8.14857L0 8.14873L0.000171268 8.14845L0 8.14835L0.000319988 8.14821L4.99878 0.000198987V0L4.99884 9.94937e-05ZM4.99878 15.9997V15.9999L4.99884 15.9998L4.9989 15.9999V15.9997L10.0006 9.07898L4.99884 11.9809L0 9.07898L4.99878 15.9997Z" fill="#303550" />
            </svg>
        `;
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        return pixi_1.RenderTexture.from(url);
    }
    [symbols_1.USDT_DARK_TEXTURE]() {
        const svg = `
            <svg width="80" height="160" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.28302 14.1505C3.28302 14.6194 3.28302 15.0594 3.28302 15.4993C3.28302 15.9464 3.33492 15.9965 3.79495 15.9989C4.04029 16.0001 4.28564 16.0007 4.53039 15.9989C4.93262 15.9965 5.00221 15.9246 5.00339 15.5153C5.00398 15.0576 5.00339 14.6005 5.00339 14.1523C5.14788 14.1181 5.25286 14.0939 5.35725 14.068C7.24098 13.602 8.38573 11.8764 8.06607 9.98734C7.89209 8.9576 7.23744 8.28998 6.36281 7.83408C5.67101 7.47314 4.92672 7.21423 4.22253 6.87453C3.73302 6.63862 3.23053 6.39504 2.80767 6.06123C2.22026 5.59767 2.26095 4.78437 2.83539 4.30017C3.33257 3.88084 3.92647 3.78648 4.54926 3.85254C5.32187 3.93451 5.98831 4.27422 6.59518 4.74486C6.84878 4.94125 6.9744 4.91589 7.13069 4.63516C7.33594 4.26773 7.5223 3.8891 7.73934 3.52816C7.88147 3.29166 7.82662 3.12417 7.62905 2.97142C7.5052 2.87528 7.38194 2.77738 7.25396 2.68774C6.58398 2.21769 5.82258 1.98414 5.00221 1.85262C5.00221 1.36252 5.00398 0.883625 5.00162 0.40473C4.99985 0.092741 4.91492 0.0072247 4.5988 0.0030963C4.29507 -0.0010321 3.99075 -0.0010321 3.68643 0.0030963C3.36618 0.0072247 3.28538 0.0874336 3.28302 0.401782C3.28008 0.813442 3.27595 1.22569 3.28479 1.63735C3.28892 1.81664 3.26179 1.92221 3.04712 1.95642C2.81887 1.99358 2.5924 2.07791 2.37949 2.17346C1.22649 2.68951 0.415555 3.50811 0.235085 4.80148C0.0410504 6.19039 0.602513 7.25788 1.78383 7.97681C2.32406 8.3059 2.9156 8.55066 3.48886 8.8249C4.07096 9.10327 4.68019 9.33092 5.23753 9.65117C6.20357 10.2061 6.15698 11.3827 5.17324 11.91C4.75509 12.1341 4.30687 12.2061 3.83564 12.1477C2.92031 12.0344 2.14005 11.6328 1.44589 11.0407C1.16751 10.803 1.08318 10.8148 0.859062 11.1109C0.646155 11.3922 0.436786 11.6764 0.226238 11.9595C-0.0934182 12.3895 -0.0869309 12.4349 0.326499 12.7958C1.16751 13.5295 2.1483 13.9636 3.28126 14.1505H3.28302Z" fill="#303550" />
            </svg>
        `;
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        return pixi_1.RenderTexture.from(url);
    }
    [symbols_1.USDC_DARK_TEXTURE]() {
        const svg = `
            <svg width="80" height="160" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.28302 14.1505C3.28302 14.6194 3.28302 15.0594 3.28302 15.4993C3.28302 15.9464 3.33492 15.9965 3.79495 15.9989C4.04029 16.0001 4.28564 16.0007 4.53039 15.9989C4.93262 15.9965 5.00221 15.9246 5.00339 15.5153C5.00398 15.0576 5.00339 14.6005 5.00339 14.1523C5.14788 14.1181 5.25286 14.0939 5.35725 14.068C7.24098 13.602 8.38573 11.8764 8.06607 9.98734C7.89209 8.9576 7.23744 8.28998 6.36281 7.83408C5.67101 7.47314 4.92672 7.21423 4.22253 6.87453C3.73302 6.63862 3.23053 6.39504 2.80767 6.06123C2.22026 5.59767 2.26095 4.78437 2.83539 4.30017C3.33257 3.88084 3.92647 3.78648 4.54926 3.85254C5.32187 3.93451 5.98831 4.27422 6.59518 4.74486C6.84878 4.94125 6.9744 4.91589 7.13069 4.63516C7.33594 4.26773 7.5223 3.8891 7.73934 3.52816C7.88147 3.29166 7.82662 3.12417 7.62905 2.97142C7.5052 2.87528 7.38194 2.77738 7.25396 2.68774C6.58398 2.21769 5.82258 1.98414 5.00221 1.85262C5.00221 1.36252 5.00398 0.883625 5.00162 0.40473C4.99985 0.092741 4.91492 0.0072247 4.5988 0.0030963C4.29507 -0.0010321 3.99075 -0.0010321 3.68643 0.0030963C3.36618 0.0072247 3.28538 0.0874336 3.28302 0.401782C3.28008 0.813442 3.27595 1.22569 3.28479 1.63735C3.28892 1.81664 3.26179 1.92221 3.04712 1.95642C2.81887 1.99358 2.5924 2.07791 2.37949 2.17346C1.22649 2.68951 0.415555 3.50811 0.235085 4.80148C0.0410504 6.19039 0.602513 7.25788 1.78383 7.97681C2.32406 8.3059 2.9156 8.55066 3.48886 8.8249C4.07096 9.10327 4.68019 9.33092 5.23753 9.65117C6.20357 10.2061 6.15698 11.3827 5.17324 11.91C4.75509 12.1341 4.30687 12.2061 3.83564 12.1477C2.92031 12.0344 2.14005 11.6328 1.44589 11.0407C1.16751 10.803 1.08318 10.8148 0.859062 11.1109C0.646155 11.3922 0.436786 11.6764 0.226238 11.9595C-0.0934182 12.3895 -0.0869309 12.4349 0.326499 12.7958C1.16751 13.5295 2.1483 13.9636 3.28126 14.1505H3.28302Z" fill="#303550" />
            </svg>
        `;
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        return pixi_1.RenderTexture.from(url);
    }
    [symbols_1.UNKNOWN_DARK_TEXTURE]() {
        const svg = `
            <svg width="100" height="160" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M4.99884 9.94937e-05L4.9989 0V0.000198987L9.99736 8.14821L9.99768 8.14835L9.99751 8.14845L9.99768 8.14873L9.99731 8.14857L4.9989 11.0502V11.0503L4.99884 11.0502L4.99878 11.0503V11.0502L0.000368504 8.14857L0 8.14873L0.000171268 8.14845L0 8.14835L0.000319988 8.14821L4.99878 0.000198987V0L4.99884 9.94937e-05ZM4.99878 15.9997V15.9999L4.99884 15.9998L4.9989 15.9999V15.9997L10.0006 9.07898L4.99884 11.9809L0 9.07898L4.99878 15.9997Z" fill="#303550" />
            </svg>
        `;
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        return pixi_1.RenderTexture.from(url);
    }
}
exports.TextureStorage = TextureStorage;
//# sourceMappingURL=TextureStorage.js.map