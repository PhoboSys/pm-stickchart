"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextureStorage = void 0;
/* eslint-disable max-len */
const _config_1 = __importDefault(require("../../config.js"));
const _infra_1 = require("../../infra/index.js");
const pixi_1 = require("../../lib/pixi");
const symbols_1 = require("./symbols");
class TextureStorage {
    constructor(application) {
        this.application = application;
        this.textures = {};
        this.precreate = [
            symbols_1.UP_ICON_TEXTURE,
            symbols_1.DOWN_ICON_TEXTURE,
            symbols_1.ZERO_ICON_TEXTURE,
            symbols_1.ETH_DARK_TEXTURE,
            symbols_1.USDC_TEXTURE,
            symbols_1.USDT_DARK_TEXTURE,
            symbols_1.UNKNOWN_DARK_TEXTURE,
            symbols_1.CHAINLINK_TEXTURE,
            symbols_1.PARI_TEXTURE,
            symbols_1.CLAIM_FRAGMENT_TEXTURE,
            symbols_1.GOLD_COIN_TEXTURE,
            symbols_1.SILVER_COIN_TEXTURE,
            symbols_1.PARI_GOLD_TEXTURE,
            symbols_1.PARI_SILVER_TEXTURE,
            symbols_1.USDC_GOLD_TEXTURE,
            symbols_1.USDC_SILVER_TEXTURE,
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
        const top = '#' + _config_1.default.style.linearresolution.upcolor.toString(16).padStart(6, '0');
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
        const top = '#' + _config_1.default.style.linearresolution.downcolor.toString(16).padStart(6, '0');
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
    [symbols_1.PRICE_LINE_TEXTURE]() {
        const x0 = 0;
        const y0 = 0 + _config_1.default.padding.top;
        const x1 = 0;
        const y1 = this.application.screen.height;
        const top = '#' + _config_1.default.style.gradient.color.toString(16).padStart(6, '0');
        const bottom = top.slice(0, 7) + '00'; // same color with opacity = 0
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
    // SVGS
    //
    [symbols_1.UP_ICON_TEXTURE]() {
        const svg = `
            <svg width="320" height="320" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_11177_13752)">
            <path d="M112.921 186.446L160.058 139.309L207.196 186.446C211.934 191.185 219.587 191.185 224.325 186.446C229.063 181.708 229.063 174.055 224.325 169.317L168.562 113.554C163.824 108.815 156.17 108.815 151.432 113.554L95.6694 169.317C90.9313 174.055 90.9313 181.708 95.6694 186.446C100.407 191.063 108.183 191.184 112.921 186.446V186.446Z" fill="white"/>
            </g>
            <defs>
            <clipPath id="clip0_11177_13752">
            <rect width="135.763" height="100" fill="white" transform="translate(92.1172 110)"/>
            </clipPath>
            </defs>
            </svg>
        `;
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        return pixi_1.RenderTexture.from(url);
    }
    [symbols_1.DOWN_ICON_TEXTURE]() {
        const svg = `
            <svg width="320" height="320" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_11177_13761)">
            <path d="M207.079 133.554L159.942 180.691L112.804 133.554C108.066 128.815 100.413 128.815 95.6746 133.554C90.9366 138.292 90.9366 145.945 95.6746 150.683L151.438 206.446C156.176 211.185 163.83 211.185 168.568 206.446L224.331 150.683C229.069 145.945 229.069 138.292 224.331 133.554C219.593 128.937 211.817 128.816 207.079 133.554V133.554Z" fill="white"/>
            </g>
            <defs>
            <clipPath id="clip0_11177_13761">
            <rect width="135.763" height="100" fill="white" transform="translate(227.883 210) rotate(-180)"/>
            </clipPath>
            </defs>
            </svg>
        `;
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        return pixi_1.RenderTexture.from(url);
    }
    [symbols_1.ZERO_ICON_TEXTURE]() {
        const svg = `
            <svg width="320" height="320" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M86.215 152.175C81.8927 152.175 78.3887 155.679 78.3886 160.001C78.389 164.323 81.8928 167.827 86.2147 167.828L103.142 167.827C104.782 179.809 110.207 191.372 119.418 200.583C141.831 222.996 178.169 222.996 200.582 200.583C209.793 191.372 215.218 179.809 216.858 167.827L233.785 167.828C238.107 167.827 241.611 164.323 241.611 160.001C241.611 155.679 238.107 152.175 233.785 152.175L216.858 152.175C215.218 140.193 209.793 128.63 200.582 119.42C178.169 97.0068 141.831 97.0068 119.418 119.42C110.207 128.63 104.782 140.193 103.142 152.175L86.215 152.175ZM118.997 167.827C120.506 175.773 124.336 183.365 130.486 189.515C146.786 205.816 173.214 205.816 189.514 189.515C195.664 183.365 199.494 175.773 201.003 167.828L118.997 167.827ZM201.003 152.175L118.997 152.175C120.506 144.229 124.336 136.638 130.486 130.487C146.786 114.187 173.214 114.187 189.514 130.487C195.664 136.638 199.494 144.229 201.003 152.175Z" fill="white"/>
            </svg>           
        `;
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        return pixi_1.RenderTexture.from(url);
    }
    [symbols_1.UNDEFINED_ICON_TEXTURE]() {
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
    [symbols_1.GRADIENT_TEXTURE]({ width, height, points, colorStops }) {
        const [x0, y0, x1, y1] = points;
        const gradient = pixi_1.GradientFactory.createLinearGradient(this.application.renderer, pixi_1.RenderTexture.create({ width, height }), {
            x0, y0,
            x1, y1,
            colorStops
        });
        return gradient;
    }
    [symbols_1.SILVER_LEVEL_TEXTURE]({ width, height }) {
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
    [symbols_1.GOLD_LEVEL_TEXTURE]({ width, height }) {
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
    [symbols_1.BRONZE_LEVEL_TEXTURE]({ width, height }) {
        const x0 = 0;
        const y0 = height + height;
        const x1 = width;
        const y1 = 0 - height;
        const gradient = pixi_1.GradientFactory.createLinearGradient(this.application.renderer, pixi_1.RenderTexture.create({ width, height }), {
            x0, y0,
            x1, y1,
            colorStops: _config_1.default.style.levels.bronzeColors,
        });
        return gradient;
    }
    [symbols_1.RESOLUTION_COUNTDOWN_TEXTURE]({ width }) {
        const { height } = this.application.screen;
        const x0 = 0;
        const y0 = 0;
        const x1 = width;
        const y1 = 0;
        const renderer = this.application.renderer;
        const gradient = pixi_1.GradientFactory.createLinearGradient(renderer, pixi_1.RenderTexture.create({ width, height }), {
            x0, y0,
            x1, y1,
            colorStops: _config_1.default.style.resolutionCountdown.colors,
        });
        return gradient;
    }
    [symbols_1.LOCK_COUNTDOWN_TEXTURE]({ width }) {
        const { height } = this.application.screen;
        const x0 = 0;
        const y0 = 0;
        const x1 = width;
        const y1 = 0;
        const renderer = this.application.renderer;
        const gradient = pixi_1.GradientFactory.createLinearGradient(renderer, pixi_1.RenderTexture.create({ width, height }), {
            x0, y0,
            x1, y1,
            colorStops: _config_1.default.style.lockCountdown.colors,
        });
        return gradient;
    }
    [symbols_1.WINNING_COUNTDOWN_TEXTURE]({ width, height }) {
        const x0 = 0;
        const y0 = 0;
        const x1 = 0;
        const y1 = height;
        const renderer = this.application.renderer;
        const gradient = pixi_1.GradientFactory.createLinearGradient(renderer, pixi_1.RenderTexture.create({ width, height }), {
            x0, y0,
            x1, y1,
            colorStops: _config_1.default.style.winningCountdown.colors
        });
        return gradient;
    }
    [symbols_1.ETH_DARK_TEXTURE]() {
        const svg = `
            <svg width="100" height="160" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.99884 9.94937e-05L4.9989 0V0.000198987L9.99736 8.14821L9.99768 8.14835L9.99751 8.14845L9.99768 8.14873L9.99731 8.14857L4.9989 11.0502V11.0503L4.99884 11.0502L4.99878 11.0503V11.0502L0.000368504 8.14857L0 8.14873L0.000171268 8.14845L0 8.14835L0.000319988 8.14821L4.99878 0.000198987V0L4.99884 9.94937e-05ZM4.99878 15.9997V15.9999L4.99884 15.9998L4.9989 15.9999V15.9997L10.0006 9.07898L4.99884 11.9809L0 9.07898L4.99878 15.9997Z" fill="#303550" />
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
    [symbols_1.USDC_TEXTURE]() {
        const svg = `
            <svg width="80" height="160" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.28302 14.1505C3.28302 14.6194 3.28302 15.0594 3.28302 15.4993C3.28302 15.9464 3.33492 15.9965 3.79495 15.9989C4.04029 16.0001 4.28564 16.0007 4.53039 15.9989C4.93262 15.9965 5.00221 15.9246 5.00339 15.5153C5.00398 15.0576 5.00339 14.6005 5.00339 14.1523C5.14788 14.1181 5.25286 14.0939 5.35725 14.068C7.24098 13.602 8.38573 11.8764 8.06607 9.98734C7.89209 8.9576 7.23744 8.28998 6.36281 7.83408C5.67101 7.47314 4.92672 7.21423 4.22253 6.87453C3.73302 6.63862 3.23053 6.39504 2.80767 6.06123C2.22026 5.59767 2.26095 4.78437 2.83539 4.30017C3.33257 3.88084 3.92647 3.78648 4.54926 3.85254C5.32187 3.93451 5.98831 4.27422 6.59518 4.74486C6.84878 4.94125 6.9744 4.91589 7.13069 4.63516C7.33594 4.26773 7.5223 3.8891 7.73934 3.52816C7.88147 3.29166 7.82662 3.12417 7.62905 2.97142C7.5052 2.87528 7.38194 2.77738 7.25396 2.68774C6.58398 2.21769 5.82258 1.98414 5.00221 1.85262C5.00221 1.36252 5.00398 0.883625 5.00162 0.40473C4.99985 0.092741 4.91492 0.0072247 4.5988 0.0030963C4.29507 -0.0010321 3.99075 -0.0010321 3.68643 0.0030963C3.36618 0.0072247 3.28538 0.0874336 3.28302 0.401782C3.28008 0.813442 3.27595 1.22569 3.28479 1.63735C3.28892 1.81664 3.26179 1.92221 3.04712 1.95642C2.81887 1.99358 2.5924 2.07791 2.37949 2.17346C1.22649 2.68951 0.415555 3.50811 0.235085 4.80148C0.0410504 6.19039 0.602513 7.25788 1.78383 7.97681C2.32406 8.3059 2.9156 8.55066 3.48886 8.8249C4.07096 9.10327 4.68019 9.33092 5.23753 9.65117C6.20357 10.2061 6.15698 11.3827 5.17324 11.91C4.75509 12.1341 4.30687 12.2061 3.83564 12.1477C2.92031 12.0344 2.14005 11.6328 1.44589 11.0407C1.16751 10.803 1.08318 10.8148 0.859062 11.1109C0.646155 11.3922 0.436786 11.6764 0.226238 11.9595C-0.0934182 12.3895 -0.0869309 12.4349 0.326499 12.7958C1.16751 13.5295 2.1483 13.9636 3.28126 14.1505H3.28302Z" fill="#ffffff" />
            </svg>
        `;
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        return pixi_1.RenderTexture.from(url);
    }
    [symbols_1.PARI_TEXTURE]() {
        const svg = `
            <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M63.2534 0C32.6338 0 6.94371 21.0443 0.260488 49.3065C-1.01928 56.8056 2.34603 66.695 11.9206 67.7261C21.4951 68.7104 25.4292 67.3512 25.6662 62.1955C25.6662 62.0081 25.7136 61.7737 25.761 61.5862C26.3298 52.5873 30.1691 44.1977 36.7101 37.7298C43.8199 30.6994 53.2522 26.8561 63.3008 26.8561C73.3493 26.8561 82.7816 30.7462 89.8914 37.7298C97.0012 44.7602 100.888 54.0871 100.888 64.0234C100.888 73.9597 96.9538 83.2867 89.8914 90.3171C82.7816 97.3475 73.3493 101.191 63.3008 101.191C56.5702 101.191 50.0765 99.4566 44.3887 96.1758C28.6523 86.0989 61.31 86.2863 73.9181 80.662C92.8302 71.3819 87.1897 50.7594 77.236 47.9473C59.3667 42.7448 49.7921 55.9619 45.1471 64.0234C40.502 72.085 34.1032 74.3347 27.7991 76.3501C27.4673 76.4438 27.183 76.5844 26.8986 76.6781C21.1159 78.881 15.1437 81.9275 13.9113 88.208C12.0628 97.5818 14.3853 105.878 23.1067 114.174C34.1506 122.844 48.1332 128 63.3008 128C99.0394 128 128 99.3629 128 64.0234C127.953 28.6371 98.992 0 63.2534 0Z" fill="#ffffff"/>
            </svg>        
        `;
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        return pixi_1.RenderTexture.from(url);
    }
    [symbols_1.UNKNOWN_DARK_TEXTURE]() {
        const svg = `
            <svg width="100" height="160" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.99884 9.94937e-05L4.9989 0V0.000198987L9.99736 8.14821L9.99768 8.14835L9.99751 8.14845L9.99768 8.14873L9.99731 8.14857L4.9989 11.0502V11.0503L4.99884 11.0502L4.99878 11.0503V11.0502L0.000368504 8.14857L0 8.14873L0.000171268 8.14845L0 8.14835L0.000319988 8.14821L4.99878 0.000198987V0L4.99884 9.94937e-05ZM4.99878 15.9997V15.9999L4.99884 15.9998L4.9989 15.9999V15.9997L10.0006 9.07898L4.99884 11.9809L0 9.07898L4.99878 15.9997Z" fill="#303550" />
            </svg>
        `;
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        return pixi_1.RenderTexture.from(url);
    }
    [symbols_1.CHAINLINK_TEXTURE]() {
        const svg = `
            <svg width="888" height="240" viewBox="0 0 888 240" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M265.929 128.602C265.655 121.777 266.723 114.965 269.073 108.559C271.422 102.153 275.006 96.2796 279.618 91.2775C284.23 86.2754 289.779 82.2438 295.943 79.4153C302.108 76.5868 308.767 75.0174 315.537 74.7976H317.64C343.804 74.7976 359.245 90.3181 363.811 108.477L347.548 113.961C346.087 107.194 342.263 101.183 336.772 97.0227C331.282 92.8629 324.492 90.8322 317.64 91.3011C300.711 91.3011 283.731 103.769 283.731 128.912C283.731 154.056 300.301 166.058 317.845 166.058C324.731 166.248 331.481 164.103 337.014 159.967C342.548 155.831 346.546 149.942 348.369 143.243L364.324 148.417C361.57 158.635 355.444 167.602 346.957 173.838C338.47 180.073 328.129 183.205 317.64 182.717C304.165 182.966 291.143 177.809 281.437 168.38C271.73 158.95 266.134 146.02 265.878 132.43C265.827 131.189 265.878 129.895 265.929 128.602Z" fill="#1F50F7"/><path d="M265.929 128.602C265.655 121.777 266.723 114.965 269.073 108.559C271.422 102.153 275.006 96.2796 279.618 91.2775C284.23 86.2754 289.779 82.2438 295.943 79.4153C302.108 76.5868 308.767 75.0174 315.537 74.7976H317.64C343.804 74.7976 359.245 90.3181 363.811 108.477L347.548 113.961C346.087 107.194 342.263 101.183 336.772 97.0227C331.282 92.8629 324.492 90.8322 317.64 91.3011C300.711 91.3011 283.731 103.769 283.731 128.912C283.731 154.056 300.301 166.058 317.845 166.058C324.731 166.248 331.481 164.103 337.014 159.967C342.548 155.831 346.546 149.942 348.369 143.243L364.324 148.417C361.57 158.635 355.444 167.602 346.957 173.838C338.47 180.073 328.129 183.205 317.64 182.717C304.165 182.966 291.143 177.809 281.437 168.38C271.73 158.95 266.134 146.02 265.878 132.43C265.827 131.189 265.878 129.895 265.929 128.602Z" fill="#3B67FB"/><path d="M395.976 180.337H379.15V74.4872H395.976V115.875C398.419 112.953 401.491 110.633 404.959 109.091C408.426 107.549 412.197 106.826 415.983 106.977C433.374 106.977 441.634 119.548 441.634 135.224V180.337H425.423V138.225C425.909 134.635 424.976 130.996 422.827 128.093C420.677 125.19 417.483 123.255 413.931 122.704C412.925 122.6 411.911 122.6 410.905 122.704C407.013 122.704 403.282 124.263 400.53 127.038C397.779 129.813 396.233 133.576 396.233 137.501C396.207 137.931 396.207 138.363 396.233 138.794L395.976 180.337Z" fill="#1F50F7"/><path d="M395.976 180.337H379.15V74.4872H395.976V115.875C398.419 112.953 401.491 110.633 404.959 109.091C408.426 107.549 412.197 106.826 415.983 106.977C433.374 106.977 441.634 119.548 441.634 135.224V180.337H425.423V138.225C425.909 134.635 424.976 130.996 422.827 128.093C420.677 125.19 417.483 123.255 413.931 122.704C412.925 122.6 411.911 122.6 410.905 122.704C407.013 122.704 403.282 124.263 400.53 127.038C397.779 129.813 396.233 133.576 396.233 137.501C396.207 137.931 396.207 138.363 396.233 138.794L395.976 180.337Z" fill="#3B67FB"/><path d="M479.391 139.57L497.449 136.724C501.553 136.207 502.579 134.086 502.579 131.551C502.579 125.55 498.577 120.738 489.241 120.738C485.714 120.451 482.218 121.577 479.51 123.872C476.802 126.168 475.1 129.447 474.774 133V133.776L459.384 130.309C460.666 117.996 471.747 107.029 489.087 107.029C510.838 107.029 519.098 119.445 519.098 133.931V169.266C519.08 173.095 519.371 176.918 519.97 180.699H504.58C504.025 177.698 503.801 174.645 503.913 171.594C501.577 175.22 498.339 178.164 494.522 180.134C490.706 182.104 486.444 183.03 482.161 182.82C476.312 183.307 470.51 181.435 466.029 177.614C461.547 173.792 458.751 168.334 458.255 162.437C458.255 162.075 458.255 161.713 458.255 161.402C457.999 148.313 467.284 141.277 479.391 139.57ZM502.681 151.003V147.744L484.264 150.538C481.764 150.618 479.392 151.669 477.642 153.472C475.893 155.275 474.902 157.69 474.876 160.212C474.896 161.462 475.163 162.696 475.66 163.841C476.157 164.986 476.876 166.019 477.774 166.881C478.671 167.743 479.73 168.417 480.889 168.861C482.047 169.306 483.282 169.514 484.521 169.473H485.29C487.39 169.694 489.513 169.495 491.536 168.886C493.559 168.277 495.443 167.27 497.078 165.923C498.714 164.577 500.069 162.917 501.066 161.04C502.063 159.163 502.681 157.106 502.887 154.987C502.96 153.654 502.874 152.316 502.63 151.003H502.681Z" fill="#1F50F7"/><path d="M479.391 139.57L497.449 136.724C501.553 136.207 502.579 134.086 502.579 131.551C502.579 125.55 498.577 120.738 489.241 120.738C485.714 120.451 482.218 121.577 479.51 123.872C476.802 126.168 475.1 129.447 474.774 133V133.776L459.384 130.309C460.666 117.996 471.747 107.029 489.087 107.029C510.838 107.029 519.098 119.445 519.098 133.931V169.266C519.08 173.095 519.371 176.918 519.97 180.699H504.58C504.025 177.698 503.801 174.645 503.913 171.594C501.577 175.22 498.339 178.164 494.522 180.134C490.706 182.104 486.444 183.03 482.161 182.82C476.312 183.307 470.51 181.435 466.029 177.614C461.547 173.792 458.751 168.334 458.255 162.437C458.255 162.075 458.255 161.713 458.255 161.402C457.999 148.313 467.284 141.277 479.391 139.57ZM502.681 151.003V147.744L484.264 150.538C481.764 150.618 479.392 151.669 477.642 153.472C475.893 155.275 474.902 157.69 474.876 160.212C474.896 161.462 475.163 162.696 475.66 163.841C476.157 164.986 476.876 166.019 477.774 166.881C478.671 167.743 479.73 168.417 480.889 168.861C482.047 169.306 483.282 169.514 484.521 169.473H485.29C487.39 169.694 489.513 169.495 491.536 168.886C493.559 168.277 495.443 167.27 497.078 165.923C498.714 164.577 500.069 162.917 501.066 161.04C502.063 159.163 502.681 157.106 502.887 154.987C502.96 153.654 502.874 152.316 502.63 151.003H502.681Z" fill="#3B67FB"/><path d="M547.723 73.0386C549.169 73.0181 550.605 73.2859 551.948 73.8266C553.291 74.3673 554.515 75.1703 555.55 76.1895C556.584 77.2086 557.409 78.4238 557.976 79.7653C558.543 81.1068 558.842 82.5481 558.856 84.0064C558.855 86.1895 558.215 88.3237 557.016 90.1409C555.816 91.958 554.11 93.377 552.113 94.2193C550.116 95.0616 547.917 95.2897 545.791 94.875C543.666 94.4602 541.71 93.4211 540.169 91.8882C538.627 90.3554 537.57 88.3972 537.129 86.2599C536.688 84.1226 536.884 81.9016 537.691 79.876C538.498 77.8505 539.882 76.1109 541.667 74.8759C543.452 73.6409 545.559 72.9657 547.723 72.9351V73.0386ZM539.515 180.648V109.15H556.342V180.337L539.515 180.648Z" fill="#1F50F7"/><path d="M547.723 73.0386C549.169 73.0181 550.605 73.2859 551.948 73.8266C553.291 74.3673 554.515 75.1703 555.55 76.1895C556.584 77.2086 557.409 78.4238 557.976 79.7653C558.543 81.1068 558.842 82.5481 558.856 84.0064C558.855 86.1895 558.215 88.3237 557.016 90.1409C555.816 91.958 554.11 93.377 552.113 94.2193C550.116 95.0616 547.917 95.2897 545.791 94.875C543.666 94.4602 541.71 93.4211 540.169 91.8882C538.627 90.3554 537.57 88.3972 537.129 86.2599C536.688 84.1226 536.884 81.9016 537.691 79.876C538.498 77.8505 539.882 76.1109 541.667 74.8759C543.452 73.6409 545.559 72.9657 547.723 72.9351V73.0386ZM539.515 180.648V109.15H556.342V180.337L539.515 180.648Z" fill="#3B67FB"/><path d="M594.663 180.337H577.888V109.15H594.253V118.617C596.386 114.982 599.451 111.992 603.124 109.962C606.798 107.932 610.946 106.937 615.132 107.08C632.369 107.08 640.783 119.652 640.783 135.328V180.337H624.007V138.225C624.007 129.482 620.057 122.394 609.489 122.394C607.536 122.407 605.604 122.809 603.804 123.575C602.004 124.342 600.371 125.458 598.999 126.861C597.627 128.264 596.543 129.926 595.808 131.751C595.073 133.577 594.701 135.53 594.715 137.501C594.715 138.07 594.715 138.639 594.715 139.208L594.663 180.337Z" fill="#1F50F7"/><path d="M594.663 180.337H577.888V109.15H594.253V118.617C596.386 114.982 599.451 111.992 603.124 109.962C606.798 107.932 610.946 106.937 615.132 107.08C632.369 107.08 640.783 119.652 640.783 135.328V180.337H624.007V138.225C624.007 129.482 620.057 122.394 609.489 122.394C607.536 122.407 605.604 122.809 603.804 123.575C602.004 124.342 600.371 125.458 598.999 126.861C597.627 128.264 596.543 129.926 595.808 131.751C595.073 133.577 594.701 135.53 594.715 137.501C594.715 138.07 594.715 138.639 594.715 139.208L594.663 180.337Z" fill="#3B67FB"/><path d="M661.097 180.337V74.4872H677.924V180.337H661.097Z" fill="#1F50F7"/><path d="M661.097 180.337V74.4872H677.924V180.337H661.097Z" fill="#3B67FB"/><path d="M707.935 73.0386C710.101 73.0283 712.22 73.6672 714.025 74.8741C715.83 76.081 717.238 77.8015 718.072 79.8172C718.905 81.8329 719.126 84.0528 718.706 86.1952C718.286 88.3376 717.244 90.3058 715.713 91.85C714.181 93.3943 712.23 94.4448 710.105 94.8684C707.981 95.2919 705.78 95.0693 703.781 94.2289C701.782 93.3884 700.076 91.968 698.879 90.148C697.683 88.3279 697.049 86.1902 697.059 84.0064C697.086 81.1059 698.24 78.3319 700.274 76.2808C702.308 74.2298 705.059 73.0656 707.935 73.0386ZM699.676 180.648V109.15H716.348V180.337L699.676 180.648Z" fill="#1F50F7"/><path d="M707.935 73.0386C710.101 73.0283 712.22 73.6672 714.025 74.8741C715.83 76.081 717.238 77.8015 718.072 79.8172C718.905 81.8329 719.126 84.0528 718.706 86.1952C718.286 88.3376 717.244 90.3058 715.713 91.85C714.181 93.3943 712.23 94.4448 710.105 94.8684C707.981 95.2919 705.78 95.0693 703.781 94.2289C701.782 93.3884 700.076 91.968 698.879 90.148C697.683 88.3279 697.049 86.1902 697.059 84.0064C697.086 81.1059 698.24 78.3319 700.274 76.2808C702.308 74.2298 705.059 73.0656 707.935 73.0386ZM699.676 180.648V109.15H716.348V180.337L699.676 180.648Z" fill="#3B67FB"/><path d="M754.926 180.337H738.1V109.15H754.465V118.617C756.602 114.985 759.667 111.999 763.34 109.97C767.013 107.94 771.158 106.942 775.344 107.08C792.581 107.08 800.994 119.652 800.994 135.328V180.337H784.168V138.225C784.653 134.635 783.721 130.996 781.571 128.093C779.422 125.19 776.227 123.255 772.676 122.704C771.653 122.601 770.622 122.601 769.598 122.704C765.679 122.745 761.935 124.344 759.178 127.153C756.421 129.962 754.875 133.755 754.875 137.707C754.823 138.31 754.823 138.916 754.875 139.518L754.926 180.337Z" fill="#1F50F7"/><path d="M754.926 180.337H738.1V109.15H754.465V118.617C756.602 114.985 759.667 111.999 763.34 109.97C767.013 107.94 771.158 106.942 775.344 107.08C792.581 107.08 800.994 119.652 800.994 135.328V180.337H784.168V138.225C784.653 134.635 783.721 130.996 781.571 128.093C779.422 125.19 776.227 123.255 772.676 122.704C771.653 122.601 770.622 122.601 769.598 122.704C765.679 122.745 761.935 124.344 759.178 127.153C756.421 129.962 754.875 133.755 754.875 137.707C754.823 138.31 754.823 138.916 754.875 139.518L754.926 180.337Z" fill="#3B67FB"/><path d="M858.4 139.208L888 180.596H867.48L846.96 151.262L838.29 160.471V180.337H821.617V74.4872H838.29V137.914L865.376 109.15H887.692L858.4 139.208Z" fill="#1F50F7"/><path d="M858.4 139.208L888 180.596H867.48L846.96 151.262L838.29 160.471V180.337H821.617V74.4872H838.29V137.914L865.376 109.15H887.692L858.4 139.208Z" fill="#3B67FB"/><path d="M103.03 50.7668L162.516 85.2036V154.416L103.198 189.064L43.7542 154.712V85.542L103.03 50.7668ZM103.03 0L81.2158 12.6917L21.8142 47.467L0 60.1587V180.18L21.8142 192.872L81.2997 227.308L103.114 240L124.928 227.308L184.204 192.618L206.018 179.926V59.7356L184.204 47.0439L124.76 12.6917L102.946 0H103.03Z" fill="#1F50F7"/><path d="M103.03 50.7668L162.516 85.2036V154.416L103.198 189.064L43.7542 154.712V85.542L103.03 50.7668ZM103.03 0L81.2158 12.6917L21.8142 47.467L0 60.1587V180.18L21.8142 192.872L81.2997 227.308L103.114 240L124.928 227.308L184.204 192.618L206.018 179.926V59.7356L184.204 47.0439L124.76 12.6917L102.946 0H103.03Z" fill="#3B67FB"/>
            </svg>
        `;
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        return pixi_1.RenderTexture.from(url);
    }
    [symbols_1.CLAIM_FRAGMENT_TEXTURE]() {
        const svg = `
            <svg width="75" height="46" viewBox="0 0 75 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27 0H55L28 46H0L27 0Z" fill="white" fill-opacity="0.2"/>
                <path d="M66.3803 0H75L47.6197 46H39L66.3803 0Z" fill="white" fill-opacity="0.2"/>
            </svg>
        `;
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        return pixi_1.RenderTexture.from(url);
    }
    // Coins
    [symbols_1.COIN_SHINE]({ radius, colorStops }) {
        const diameter = 2 * radius;
        const x0 = radius;
        const y0 = radius;
        const x1 = radius;
        const y1 = radius;
        const r0 = 0;
        const r1 = radius;
        const renderer = this.application.renderer;
        const gradient = pixi_1.GradientFactory.createRadialGradient(renderer, pixi_1.RenderTexture.create({ width: diameter, height: diameter }), {
            x0, y0, r0,
            x1, y1, r1,
            colorStops,
        });
        return gradient;
    }
    [symbols_1.GOLD_COIN_TEXTURE]() {
        const svg = `
            <svg width="295" height="280" viewBox="0 0 295 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="path-1-outside-1_11061_14497" maskUnits="userSpaceOnUse" x="0" y="0" width="295" height="280" fill="black">
                <rect fill="white" width="295" height="280"/>
                <path d="M15 140C15 62.6801 77.6801 0 155 0V0C232.32 0 295 62.6801 295 140V140C295 217.32 232.32 280 155 280V280C77.6801 280 15 217.32 15 140V140Z"/>
                </mask>
                <path d="M15 140C15 62.6801 77.6801 0 155 0V0C232.32 0 295 62.6801 295 140V140C295 217.32 232.32 280 155 280V280C77.6801 280 15 217.32 15 140V140Z" fill="url(#paint0_linear_11061_14497)"/>
                <path d="M15 0H295H15ZM295 280H15H295ZM140 280C62.6801 280 0 217.32 0 140C0 62.6801 62.6801 0 140 0H155C85.9644 0 30 62.6801 30 140C30 217.32 85.9644 280 155 280H140ZM295 0V280V0Z" fill="#8B6C32" mask="url(#path-1-outside-1_11061_14497)"/>
                <defs>
                <linearGradient id="paint0_linear_11061_14497" x1="15" y1="280" x2="341.94" y2="205.218" gradientUnits="userSpaceOnUse">
                <stop stop-color="#F7C15B"/>
                <stop offset="1" stop-color="#FFD78D"/>
                </linearGradient>
                </defs>
            </svg>
        `;
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        return pixi_1.RenderTexture.from(url);
    }
    [symbols_1.SILVER_COIN_TEXTURE]() {
        const svg = `
            <svg width="295" height="280" viewBox="0 0 295 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="path-1-outside-1_11061_14502" maskUnits="userSpaceOnUse" x="0" y="0" width="295" height="280" fill="black">
                <rect fill="white" width="295" height="280"/>
                <path d="M15 140C15 62.6801 77.6801 0 155 0V0C232.32 0 295 62.6801 295 140V140C295 217.32 232.32 280 155 280V280C77.6801 280 15 217.32 15 140V140Z"/>
                </mask>
                <path d="M15 140C15 62.6801 77.6801 0 155 0V0C232.32 0 295 62.6801 295 140V140C295 217.32 232.32 280 155 280V280C77.6801 280 15 217.32 15 140V140Z" fill="url(#paint0_linear_11061_14502)"/>
                <path d="M15 0H295H15ZM295 280H15H295ZM140 280C62.6801 280 0 217.32 0 140C0 62.6801 62.6801 0 140 0H155C85.9644 0 30 62.6801 30 140C30 217.32 85.9644 280 155 280H140ZM295 0V280V0Z" fill="#40607A" mask="url(#path-1-outside-1_11061_14502)"/>
                <defs>
                <linearGradient id="paint0_linear_11061_14502" x1="15" y1="280" x2="341.94" y2="205.218" gradientUnits="userSpaceOnUse">
                <stop stop-color="#8AACCC"/>
                <stop offset="1" stop-color="#D4ECF3"/>
                </linearGradient>
                </defs>
            </svg>        
        `;
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        return pixi_1.RenderTexture.from(url);
    }
    [symbols_1.PARI_SILVER_TEXTURE]() {
        const svg = `
            <svg width="198" height="200" viewBox="0 0 198 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_i_11062_14511)">
                <path d="M97.8451 0C50.4804 0 10.741 32.8817 0.402943 77.0414C-1.57669 88.7587 3.62902 104.211 18.4396 105.822C33.2502 107.36 39.3358 105.236 39.7024 97.1805V97.1805C39.7024 96.5382 39.8666 95.9054 39.9173 95.2651C41.0028 81.5696 46.8992 68.8278 56.7859 58.9528C67.7839 47.9678 82.3746 41.9627 97.9184 41.9627C113.462 41.9627 128.053 48.041 139.051 58.9528C150.049 69.9378 156.061 84.5112 156.061 100.037C156.061 115.562 149.975 130.135 139.051 141.12C128.053 152.105 113.462 158.111 97.9184 158.111C87.507 158.111 77.4621 155.401 68.6637 150.275C44.3215 134.529 94.8389 134.822 114.342 126.034C143.597 111.534 134.872 79.3116 119.474 74.9176C91.8328 66.7887 77.0222 87.4405 69.8369 100.037C62.6515 112.633 52.7533 116.148 43.0018 119.297C42.4886 119.443 42.0486 119.663 41.6087 119.81C32.6637 123.252 23.4254 128.012 21.5191 137.825C18.6596 152.472 22.2523 165.434 35.7431 178.396C52.8267 191.944 74.456 200 97.9184 200C153.202 200 198 155.254 198 100.037C197.927 44.7455 153.128 0 97.8451 0Z" fill="url(#paint0_linear_11062_14511)"/>
                </g>
                <defs>
                <filter id="filter0_i_11062_14511" x="0" y="0" width="198" height="201" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="1"/>
                <feGaussianBlur stdDeviation="1"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_11062_14511"/>
                </filter>
                <linearGradient id="paint0_linear_11062_14511" x1="2.95043e-06" y1="200" x2="231.422" y2="147.595" gradientUnits="userSpaceOnUse">
                <stop stop-color="#597E9B"/>
                <stop offset="1" stop-color="#8CB6DA"/>
                <stop offset="1" stop-color="#8CB6DA"/>
                </linearGradient>
                </defs>
            </svg>        
        `;
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        return pixi_1.RenderTexture.from(url);
    }
    [symbols_1.PARI_GOLD_TEXTURE]() {
        const svg = `
            <svg width="198" height="200" viewBox="0 0 198 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_i_11062_14512)">
                <path d="M97.8451 0C50.4804 0 10.741 32.8817 0.402943 77.0414C-1.57669 88.7587 3.62902 104.211 18.4396 105.822C33.2502 107.36 39.3358 105.236 39.7024 97.1805V97.1805C39.7024 96.5382 39.8666 95.9054 39.9173 95.2651C41.0028 81.5696 46.8992 68.8278 56.7859 58.9528C67.7839 47.9678 82.3746 41.9626 97.9184 41.9626C113.462 41.9626 128.053 48.041 139.051 58.9528C150.049 69.9378 156.061 84.5112 156.061 100.037C156.061 115.562 149.975 130.135 139.051 141.12C128.053 152.105 113.462 158.111 97.9184 158.111C87.507 158.111 77.4621 155.401 68.6637 150.275C44.3215 134.529 94.8389 134.822 114.342 126.034C143.597 111.534 134.872 79.3116 119.474 74.9176C91.8328 66.7887 77.0222 87.4405 69.8369 100.037C62.6515 112.633 52.7533 116.148 43.0018 119.297C42.4886 119.443 42.0486 119.663 41.6087 119.81C32.6637 123.252 23.4254 128.012 21.5191 137.825C18.6596 152.472 22.2523 165.434 35.7431 178.396C52.8267 191.944 74.456 200 97.9184 200C153.202 200 198 155.254 198 100.037C197.927 44.7455 153.128 0 97.8451 0Z" fill="url(#paint0_linear_11062_14512)"/>
                </g>
                <defs>
                <filter id="filter0_i_11062_14512" x="0" y="0" width="198" height="201" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="1"/>
                <feGaussianBlur stdDeviation="1"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_11062_14512"/>
                </filter>
                <linearGradient id="paint0_linear_11062_14512" x1="2.95043e-06" y1="200" x2="231.422" y2="147.595" gradientUnits="userSpaceOnUse">
                <stop stop-color="#967332"/>
                <stop offset="1" stop-color="#D1AB65"/>
                </linearGradient>
                </defs>
            </svg>
        `;
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        return pixi_1.RenderTexture.from(url);
    }
    [symbols_1.USDC_SILVER_TEXTURE]() {
        const svg = `
            <svg width="224" height="214" viewBox="0 0 224 214" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_i_11064_14524)">
                <path d="M152.956 128.647C152.956 107 139.924 99.578 113.862 96.486C95.2454 94.0115 91.5222 89.064 91.5222 80.404C91.5222 71.744 97.7281 66.179 110.138 66.179C121.308 66.179 127.514 69.89 130.616 79.1675C131.237 81.023 133.099 82.2595 134.96 82.2595H144.888C147.371 82.2595 149.232 80.404 149.232 77.931V77.312C146.75 63.7045 135.58 53.1905 121.308 51.954V37.11C121.308 34.6355 119.446 32.78 116.344 32.161H107.036C104.554 32.161 102.692 34.0165 102.071 37.11V51.335C83.4547 53.8095 71.6655 66.179 71.6655 81.642C71.6655 102.053 84.0757 110.092 110.138 113.186C127.514 116.278 133.099 119.989 133.099 129.885C133.099 139.782 124.41 146.585 112.621 146.585C96.486 146.585 90.9012 139.78 89.0396 130.503C88.42 128.029 86.5584 126.792 84.6968 126.792H74.1466C71.6655 126.792 69.8038 128.647 69.8038 131.122V131.741C72.285 147.202 82.2141 158.335 102.692 161.429V176.272C102.692 178.746 104.554 180.601 107.656 181.22H116.964C119.446 181.22 121.308 179.365 121.929 176.272V161.429C140.545 158.335 152.956 145.347 152.956 128.647Z" fill="url(#paint0_linear_11064_14524)"/>
                <path d="M80.3525 193.59C31.9505 176.272 7.12841 122.463 25.125 74.8375C34.4331 48.8605 54.9109 29.069 80.3525 19.7915C82.8352 18.555 84.0757 16.6995 84.0757 13.606V4.9475C84.0757 2.47301 82.8352 0.61751 80.3525 0C79.7315 0 78.4909 -3.95069e-06 77.8699 0.617506C18.9192 19.1725 -13.3494 81.642 5.26679 140.399C16.4365 175.035 43.1202 201.631 77.8699 212.764C80.3525 214 82.8352 212.763 83.4547 210.289C84.0757 209.671 84.0757 209.053 84.0757 207.816V199.156C84.0757 197.3 82.2141 194.827 80.3525 193.59ZM146.13 0.617506C143.647 -0.618999 141.165 0.617509 140.545 3.092C139.924 3.711 139.924 4.32851 139.924 5.5665V14.225C139.924 16.6995 141.786 19.1725 143.647 20.4105C192.05 37.7275 216.872 91.537 198.875 139.162C189.567 165.139 169.089 184.931 143.647 194.208C141.165 195.445 139.924 197.301 139.924 200.394V209.053C139.924 211.527 141.165 213.382 143.647 214C144.269 214 145.509 214 146.13 213.383C205.081 194.828 237.349 132.358 218.733 73.601C207.564 38.3465 180.259 11.7505 146.13 0.617506Z" fill="url(#paint1_linear_11064_14524)"/>
                </g>
                <defs>
                <filter id="filter0_i_11064_14524" x="0" y="0" width="224" height="215" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="1"/>
                <feGaussianBlur stdDeviation="1"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_11064_14524"/>
                </filter>
                <linearGradient id="paint0_linear_11064_14524" x1="3.33786e-06" y1="214" x2="260.314" y2="151.675" gradientUnits="userSpaceOnUse">
                <stop stop-color="#597E9B"/>
                <stop offset="1" stop-color="#8CB6DA"/>
                </linearGradient>
                <linearGradient id="paint1_linear_11064_14524" x1="3.33786e-06" y1="214" x2="260.314" y2="151.675" gradientUnits="userSpaceOnUse">
                <stop stop-color="#597E9B"/>
                <stop offset="1" stop-color="#8CB6DA"/>
                </linearGradient>
                </defs>
            </svg>        
        `;
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        return pixi_1.RenderTexture.from(url);
    }
    [symbols_1.USDC_GOLD_TEXTURE]() {
        const svg = `
            <svg width="224" height="214" viewBox="0 0 224 214" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_i_11064_14518)">
                <path d="M152.956 128.647C152.956 107 139.924 99.578 113.862 96.486C95.2454 94.0115 91.5222 89.064 91.5222 80.404C91.5222 71.744 97.7281 66.179 110.138 66.179C121.308 66.179 127.514 69.89 130.616 79.1675C131.237 81.023 133.099 82.2595 134.96 82.2595H144.888C147.371 82.2595 149.232 80.404 149.232 77.931V77.312C146.75 63.7045 135.58 53.1905 121.308 51.954V37.11C121.308 34.6355 119.446 32.78 116.344 32.161H107.036C104.554 32.161 102.692 34.0165 102.071 37.11V51.335C83.4547 53.8095 71.6655 66.179 71.6655 81.642C71.6655 102.053 84.0757 110.092 110.138 113.186C127.514 116.278 133.099 119.989 133.099 129.885C133.099 139.782 124.41 146.585 112.621 146.585C96.486 146.585 90.9012 139.78 89.0396 130.503C88.42 128.029 86.5584 126.792 84.6968 126.792H74.1466C71.6655 126.792 69.8038 128.647 69.8038 131.122V131.741C72.285 147.202 82.2141 158.335 102.692 161.429V176.272C102.692 178.746 104.554 180.601 107.656 181.22H116.964C119.446 181.22 121.308 179.365 121.929 176.272V161.429C140.545 158.335 152.956 145.347 152.956 128.647Z" fill="url(#paint0_linear_11064_14518)"/>
                <path d="M80.3525 193.59C31.9505 176.272 7.12841 122.463 25.125 74.8375C34.4331 48.8605 54.9109 29.069 80.3525 19.7915C82.8352 18.555 84.0757 16.6995 84.0757 13.606V4.9475C84.0757 2.47301 82.8352 0.61751 80.3525 0C79.7315 0 78.4909 -3.95069e-06 77.8699 0.617506C18.9192 19.1725 -13.3494 81.642 5.26679 140.399C16.4365 175.035 43.1202 201.631 77.8699 212.764C80.3525 214 82.8352 212.763 83.4547 210.289C84.0757 209.671 84.0757 209.053 84.0757 207.816V199.156C84.0757 197.3 82.2141 194.827 80.3525 193.59ZM146.13 0.617506C143.647 -0.618999 141.165 0.617509 140.545 3.092C139.924 3.711 139.924 4.32851 139.924 5.5665V14.225C139.924 16.6995 141.786 19.1725 143.647 20.4105C192.05 37.7275 216.872 91.537 198.875 139.162C189.567 165.139 169.089 184.931 143.647 194.208C141.165 195.445 139.924 197.301 139.924 200.394V209.053C139.924 211.527 141.165 213.382 143.647 214C144.269 214 145.509 214 146.13 213.383C205.081 194.828 237.349 132.358 218.733 73.601C207.564 38.3465 180.259 11.7505 146.13 0.617506Z" fill="url(#paint1_linear_11064_14518)"/>
                </g>
                <defs>
                <filter id="filter0_i_11064_14518" x="0" y="0" width="224" height="215" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="1"/>
                <feGaussianBlur stdDeviation="1"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_11064_14518"/>
                </filter>
                <linearGradient id="paint0_linear_11064_14518" x1="3.33786e-06" y1="214" x2="260.314" y2="151.675" gradientUnits="userSpaceOnUse">
                <stop stop-color="#967332"/>
                <stop offset="1" stop-color="#D1AB65"/>
                </linearGradient>
                <linearGradient id="paint1_linear_11064_14518" x1="3.33786e-06" y1="214" x2="260.314" y2="151.675" gradientUnits="userSpaceOnUse">
                <stop stop-color="#967332"/>
                <stop offset="1" stop-color="#D1AB65"/>
                </linearGradient>
                </defs>
            </svg>        
        `;
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        return pixi_1.RenderTexture.from(url);
    }
    [symbols_1.UNKNOWN_CURRENCY_TEXTURE]() {
        const svg = `
            <svg width="224" height="214" viewBox="0 0 224 214" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M152.956 128.647C152.956 107 139.924 99.578 113.862 96.486C95.2454 94.0115 91.5222 89.064 91.5222 80.404C91.5222 71.744 97.7281 66.179 110.138 66.179C121.308 66.179 127.514 69.89 130.616 79.1675C131.237 81.023 133.099 82.2595 134.96 82.2595H144.888C147.371 82.2595 149.232 80.404 149.232 77.931V77.312C146.75 63.7045 135.58 53.1905 121.308 51.954V37.11C121.308 34.6355 119.446 32.78 116.344 32.161H107.036C104.554 32.161 102.692 34.0165 102.071 37.11V51.335C83.4547 53.8095 71.6655 66.179 71.6655 81.642C71.6655 102.053 84.0757 110.092 110.138 113.186C127.514 116.278 133.099 119.989 133.099 129.885C133.099 139.782 124.41 146.585 112.621 146.585C96.486 146.585 90.9012 139.78 89.0396 130.503C88.42 128.029 86.5584 126.792 84.6968 126.792H74.1466C71.6655 126.792 69.8038 128.647 69.8038 131.122V131.741C72.285 147.202 82.2141 158.335 102.692 161.429V176.272C102.692 178.746 104.554 180.601 107.656 181.22H116.964C119.446 181.22 121.308 179.365 121.929 176.272V161.429C140.545 158.335 152.956 145.347 152.956 128.647Z" fill="white"/>
            <path d="M80.3525 193.59C31.9505 176.272 7.12841 122.463 25.125 74.8375C34.4331 48.8605 54.9109 29.069 80.3525 19.7915C82.8352 18.555 84.0757 16.6995 84.0757 13.606V4.9475C84.0757 2.47301 82.8352 0.61751 80.3525 0C79.7315 0 78.4909 -3.95069e-06 77.8699 0.617506C18.9192 19.1725 -13.3494 81.642 5.26679 140.399C16.4365 175.035 43.1202 201.631 77.8699 212.764C80.3525 214 82.8352 212.763 83.4547 210.289C84.0757 209.671 84.0757 209.053 84.0757 207.816V199.156C84.0757 197.3 82.2141 194.827 80.3525 193.59ZM146.13 0.617506C143.647 -0.618999 141.165 0.617509 140.545 3.092C139.924 3.711 139.924 4.32851 139.924 5.5665V14.225C139.924 16.6995 141.786 19.1725 143.647 20.4105C192.05 37.7275 216.872 91.537 198.875 139.162C189.567 165.139 169.089 184.931 143.647 194.208C141.165 195.445 139.924 197.301 139.924 200.394V209.053C139.924 211.527 141.165 213.382 143.647 214C144.269 214 145.509 214 146.13 213.383C205.081 194.828 237.349 132.358 218.733 73.601C207.564 38.3465 180.259 11.7505 146.13 0.617506Z" fill="white"/>
            </svg>        
        `;
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        return pixi_1.RenderTexture.from(url);
    }
}
exports.TextureStorage = TextureStorage;
//# sourceMappingURL=TextureStorage.js.map