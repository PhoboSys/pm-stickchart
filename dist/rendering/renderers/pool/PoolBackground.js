"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolBackground = void 0;
const _rendering_1 = require("../../index.js");
const _infra_1 = require("../../../infra/index.js");
const textures_1 = require("../../textures");
const _config_1 = __importDefault(require("../../../config.js"));
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
const utils_1 = require("../../../lib/utils");
const _enums_1 = require("../../../enums/index.js");
const BasePoolsRenderer_1 = require("./BasePoolsRenderer");
class PoolBackground extends BasePoolsRenderer_1.BasePoolsRenderer {
    constructor() {
        super(...arguments);
        this.bgAnimOffset = 0.19;
        this.winBorderStyle = {
            left: {
                colorStops: _config_1.default.style.poolRoundWinBorderColors,
                width: 2,
                offset: [0, 0],
                alpha: 0.33,
            },
            right: {
                colorStops: _config_1.default.style.poolRoundWinBorderColors,
                width: 2,
                offset: [-2, 0],
                alpha: 0.33,
            }
        };
        this.backgroundStyle = {
            alpha: 0.25,
            hoverAlpha: 0.39,
        };
        this.coinStyle = {
            scale: 0.2,
            offsetY: 0.075,
            anchor: [0.5, 0.5],
        };
        this.coinShineStyle = {
            gold: {
                blur: 20,
                alpha: 0.5,
                radius: 75,
                colorStops: _config_1.default.style.goldCoinShineColors,
            },
            silver: {
                blur: 20,
                alpha: 0.3,
                radius: 75,
                colorStops: _config_1.default.style.silverCoinShineColors,
            },
        };
        this.coinCurrencyStyle = {
            scale: 0.2,
            anchor: [0.5, 0.5],
        };
        this.configAnimations = {
            hover_bg: {
                duration: 0.5,
                ease: 'power2.out',
                clear: true,
            },
            unhover_bg: {
                duration: 0.5,
                ease: 'power2.out',
                delay: 0.5,
            },
            hover_border: {
                pixi: {
                    alpha: 0.5
                },
                duration: 0.5,
                ease: 'power2.out',
                clear: true,
            },
            unhover_border: {
                pixi: {
                    alpha: 0.33,
                },
                duration: 0.5,
                ease: 'power2.out',
                delay: 0.5,
            },
            show_coin: {
                pixi: {
                    alpha: 1,
                },
                duration: 0.5,
                ease: 'power2.out',
            },
            hide_coin: {
                pixi: {
                    alpha: 0,
                },
                duration: 0.5,
                ease: 'power2.out',
            }
        };
    }
    get rendererId() {
        return PoolBackground.POOL_BACKGROUND_ID;
    }
    get animations() {
        return this.configAnimations;
    }
    updatePool(pool, context, container) {
        var _a;
        const isHistorical = this.isHistoricalPool(pool, context);
        if (!pool.openPriceTimestamp || !pool.openPriceValue || !isHistorical)
            return this.clear();
        const { width } = context.screen;
        const { timerange } = context.plotdata;
        const { openPriceTimestamp, endDate } = pool;
        const rprice = this.getResolutionPricePoint(pool, context);
        const rdate = (rprice === null || rprice === void 0 ? void 0 : rprice.timestamp) || endDate;
        const paris = (_a = context.paris) === null || _a === void 0 ? void 0 : _a[pool.poolid];
        const resolution = this.getPoolResolution(pool, context);
        const nocontest = resolution === _enums_1.EPosition.NoContest;
        const hasWonPari = paris && paris.some(pari => pari.position === resolution && isHistorical && !nocontest && !pari.phantom);
        const hashClaimablePari = paris && paris.some(pari => {
            const phantom = pari.phantom;
            const win = pari.position === resolution;
            const won = win && isHistorical && !nocontest && !phantom;
            const reverted = _rendering_1.EntityUtils.isEnityReverted(context, pari.pariid);
            const orphan = phantom && reverted;
            const claimable = !pari.claimed && (won || nocontest) && !orphan;
            return claimable;
        });
        const shouldRenderClaimable = !(0, utils_1.isEmpty)(paris) && hashClaimablePari;
        const [ox, rx] = datamath_1.default.scale([openPriceTimestamp, rdate], timerange, width);
        this.udateDefaultBackground(context, container, [ox, rx], pool, !shouldRenderClaimable);
        let bgTextureColorStops;
        if (hasWonPari)
            bgTextureColorStops = _config_1.default.style.poolRoundWinColors;
        else if (nocontest)
            bgTextureColorStops = _config_1.default.style.poolRoundNoContestColors;
        this.udateClaimableBackground(context, container, [ox, rx], pool, bgTextureColorStops, shouldRenderClaimable);
        this.updateClaimableBorder(context, container, [ox, rx], pool, shouldRenderClaimable && hasWonPari);
        this.updateCoinIcon(context, container, [ox, rx], pool, hasWonPari, shouldRenderClaimable);
    }
    udateDefaultBackground(context, container, [x1, x2], pool, shouldRender) {
        if (!shouldRender) {
            this.clear('backgroundContainer');
            this.clear('background');
            return;
        }
        const { height, width } = context.screen;
        const poolid = pool.poolid;
        const [backgroundContainer, backgroundContainerState] = this.get('backgroundContainer', () => new pixi_1.Container());
        if (backgroundContainerState.new) {
            container.addChild(backgroundContainer);
            backgroundContainer.alpha = 0;
        }
        if (!backgroundContainerState.subscribed) {
            backgroundContainerState.subscribed = true;
            context.eventTarget.addEventListener('poolhover', (e) => {
                if (e.poolid !== poolid)
                    return;
                this.rebind(poolid);
                this.animate('backgroundContainer', 'hover_bg', { pixi: { alpha: 1 } });
            });
            context.eventTarget.addEventListener('poolunhover', (e) => {
                if (e.poolid !== poolid)
                    return;
                this.rebind(poolid);
                this.animate('backgroundContainer', 'unhover_bg', { pixi: { alpha: 0.5 } });
            });
        }
        if (backgroundContainerState.animation !== 'hover_bg')
            this.animate('backgroundContainer', 'unhover_bg', { pixi: { alpha: 0.5 } });
        const shape = [
            x1, 0,
            x2, 0,
            x2, height,
            x1, height,
        ];
        const [background, backgroundState] = this.get('background', () => new pixi_1.Graphics());
        if (backgroundState.new)
            backgroundContainer.addChild(background);
        background
            .clear()
            .beginTextureFill({ texture: context.textures.get(textures_1.GRADIENT_TEXTURE, {
                width,
                height,
                points: [0, 0, 0, height],
                colorStops: _config_1.default.style.poolRoundColors,
            }) })
            .drawPolygon(shape)
            .closePath()
            .endFill();
    }
    updateClaimableBorder(context, container, [x1, x2], pool, shouldRender) {
        if (!shouldRender) {
            this.clear('winBorderLeft');
            this.clear('winBorderRight');
            return;
        }
        const { height } = context.screen;
        const poolid = pool.poolid;
        const [borderLeft, borderLeftState] = this.get('winBorderLeft', () => this.createBorder(context, height, this.winBorderStyle.left), [height]);
        if (borderLeftState.new)
            container.addChild(borderLeft);
        borderLeft.position.x = x1;
        const [borderRight, borderRightState] = this.get('winBorderRight', () => this.createBorder(context, height, this.winBorderStyle.right), [height]);
        if (borderRightState.new)
            container.addChild(borderRight);
        borderRight.position.x = x2;
        if (!borderLeftState.subscribed) {
            borderLeftState.subscribed = true;
            context.eventTarget.addEventListener('poolhover', (e) => {
                if (e.poolid !== poolid)
                    return;
                this.rebind(poolid);
                this.animate('winBorderLeft', 'hover_border');
                this.animate('winBorderRight', 'hover_border');
            });
            context.eventTarget.addEventListener('poolunhover', (e) => {
                if (e.poolid !== poolid)
                    return;
                this.rebind(poolid);
                this.animate('winBorderLeft', 'unhover_border');
                this.animate('winBorderRight', 'unhover_border');
            });
        }
    }
    udateClaimableBackground(context, container, [x1, x2], pool, textureColorStops, shouldRender) {
        if (!shouldRender) {
            this.clear('claimableContainer');
            this.clear('topContainer');
            this.clear('topGradient');
            this.clear('bottomContainer');
            this.clear('bottomGradient');
            return;
        }
        const [claimableContainer, claimableContainerState] = this.get('claimableContainer', () => new pixi_1.Container());
        if (claimableContainerState.new)
            container.addChild(claimableContainer);
        const [topContainer, topContainerState] = this.get('topContainer', () => new pixi_1.Container());
        if (topContainerState.new) {
            topContainer.alpha = 0;
            claimableContainer.addChild(topContainer);
        }
        const { height, width } = context.screen;
        const bgheight = height * (1 + this.bgAnimOffset);
        const shape = [
            x1, 0,
            x2, 0,
            x2, bgheight,
            x1, bgheight,
        ];
        const [topGradient, topGradientState] = this.get('topGradient', () => new pixi_1.Graphics());
        if (topGradientState.new)
            topContainer.addChild(topGradient);
        topGradient
            .clear()
            .beginTextureFill({ texture: context.textures.get(textures_1.GRADIENT_TEXTURE, {
                width,
                height: bgheight,
                points: [0, 0, 0, bgheight],
                colorStops: textureColorStops,
            }) })
            .drawPolygon(shape)
            .closePath()
            .endFill();
        const [bottomContainer, bottomContainerState] = this.get('bottomContainer', () => new pixi_1.Container());
        if (bottomContainerState.new) {
            bottomContainer.alpha = 0;
            claimableContainer.addChild(bottomContainer);
        }
        const [bottomGradient, bottomGradientState] = this.get('bottomGradient', () => new pixi_1.Graphics());
        if (bottomGradientState.new)
            bottomContainer.addChild(bottomGradient);
        bottomGradient
            .clear()
            .beginTextureFill({ texture: context.textures.get(textures_1.GRADIENT_TEXTURE, {
                width,
                height: bgheight,
                points: [0, 0, 0, bgheight],
                colorStops: _config_1.default.style.poolRoundBottomColors,
            }) })
            .drawPolygon(shape)
            .closePath()
            .endFill();
        const poolid = pool.poolid;
        if (!claimableContainerState.subscribed) {
            claimableContainerState.subscribed = true;
            context.eventTarget.addEventListener('poolhover', (e) => {
                if (e.poolid !== poolid)
                    return;
                this.rebind(poolid);
                this.animate('topContainer', 'hover_bg', { pixi: { y: 0, alpha: this.backgroundStyle.hoverAlpha } });
                this.animate('bottomContainer', 'hover_bg', { pixi: { alpha: this.backgroundStyle.hoverAlpha } });
            });
            context.eventTarget.addEventListener('poolunhover', (e) => {
                if (e.poolid !== poolid)
                    return;
                this.rebind(poolid);
                this.animate('topContainer', 'unhover_bg', {
                    pixi: { y: -height * this.bgAnimOffset, alpha: this.backgroundStyle.alpha }
                });
                this.animate('bottomContainer', 'unhover_bg', { pixi: { alpha: this.backgroundStyle.alpha } });
            });
        }
        if (topContainerState.animation !== 'hover_bg') {
            this.animate('topContainer', 'unhover_bg', {
                pixi: { y: -height * this.bgAnimOffset, alpha: this.backgroundStyle.alpha }
            });
        }
        if (bottomContainerState.animation !== 'hover_bg') {
            this.animate('bottomContainer', 'unhover_bg', { pixi: { alpha: this.backgroundStyle.alpha } });
        }
    }
    updateCoinIcon(context, container, [x1, x2], pool, win, shouldRender) {
        if (!shouldRender) {
            this.clear('iconContainer');
            this.clear('coinShine');
            this.clear('coin');
            this.clear('coinCurrency');
            return;
        }
        const { height } = context.screen;
        const [iconContainer, iconContainerState] = this.get('iconContainer', () => new pixi_1.Container());
        if (iconContainerState.new) {
            iconContainer.alpha = 0;
            container.addChild(iconContainer);
        }
        const ox = (x1 + x2) / 2;
        const oy = this.coinStyle.offsetY * height;
        const [coinShine, coinShineState] = this.get('coinShine', () => this.createCoinShine(context, win), [win]);
        if (coinShineState.new)
            iconContainer.addChild(coinShine);
        coinShine.position.set(ox, oy);
        const [coin, coinState] = this.get('coin', () => this.createCoin(context, win), [win]);
        if (coinState.new)
            iconContainer.addChild(coin);
        coin.position.set(ox, oy);
        const [coinCurrency, coinCurrencyState] = this.get('coinCurrency', () => this.createCoinCurrency(context, win), [win]);
        if (coinCurrencyState.new)
            iconContainer.addChild(coinCurrency);
        coinCurrency.position.set(ox + (coin.width - coin.height) / 2, oy);
        if ((x2 - x1) > coin.width + 20 && iconContainerState.animation !== 'show_coin')
            this.animate('iconContainer', 'show_coin');
        else if ((x2 - x1) < coin.width + 20 && iconContainerState.animation !== 'hide_coin')
            this.animate('iconContainer', 'hide_coin');
    }
    createBorder(context, height, style) {
        const container = new pixi_1.Container();
        const { offset: [ofx, ofy], width, colorStops, alpha } = style;
        const texture = context.textures.get(textures_1.GRADIENT_TEXTURE, {
            width,
            height,
            points: [0, 0, 0, height],
            colorStops,
        });
        const border = (new pixi_1.Graphics())
            .beginTextureFill({ texture })
            .drawRect(ofx, ofy, width, height)
            .endFill();
        container.alpha = alpha;
        container.addChild(border);
        return container;
    }
    createCoin(context, win) {
        const { scale, anchor } = this.coinStyle;
        const textureName = win ? textures_1.GOLD_COIN_TEXTURE : textures_1.SILVER_COIN_TEXTURE;
        const texture = context.textures.get(textureName);
        const icon = new pixi_1.Sprite(texture);
        icon.scale.set(scale);
        icon.anchor.set(...anchor);
        return icon;
    }
    createCoinCurrency(context, win) {
        const { scale, anchor } = this.coinCurrencyStyle;
        const textureName = this.getCoinCurrencyTextureName(context, win);
        const texture = context.textures.get(textureName);
        const icon = new pixi_1.Sprite(texture);
        icon.scale.set(scale);
        icon.anchor.set(...anchor);
        return icon;
    }
    createCoinShine(context, win) {
        const style = win ? this.coinShineStyle.gold : this.coinShineStyle.silver;
        const { radius, blur, alpha, colorStops } = style;
        const texture = context.textures.get(textures_1.COIN_SHINE, { radius, colorStops });
        const shine = (new pixi_1.Graphics())
            .beginTextureFill({ texture, alpha })
            .drawCircle(radius, radius, radius);
        shine.pivot.set(radius, radius);
        shine.filters = [new pixi_1.BlurFilter(blur)];
        return shine;
    }
    getCoinCurrencyTextureName(context, win) {
        var _a;
        const key = `${(_a = context.metapool) === null || _a === void 0 ? void 0 : _a.currency}_${win ? 'GOLD' : 'SILVER'}`;
        switch (key) {
            case 'PARI_SILVER':
                return textures_1.PARI_SILVER_TEXTURE;
            case 'PARI_GOLD':
                return textures_1.PARI_GOLD_TEXTURE;
            case 'USDC_SILVER':
                return textures_1.USDC_SILVER_TEXTURE;
            case 'USDC_GOLD':
                return textures_1.USDC_GOLD_TEXTURE;
            default:
                _infra_1.Logger.error(`currency "${key}" is not supported, fallback to UNKNOWN_CURRENCY_TEXTURE`);
                return textures_1.UNKNOWN_CURRENCY_TEXTURE;
        }
    }
}
exports.PoolBackground = PoolBackground;
PoolBackground.POOL_BACKGROUND_ID = Symbol('POOL_BACKGROUND_ID');
//# sourceMappingURL=PoolBackground.js.map