"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoundBackground = void 0;
const _rendering_1 = require("../../index.js");
const _infra_1 = require("../../../infra/index.js");
const textures_1 = require("../../textures");
const _config_1 = __importDefault(require("../../../config.js"));
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
const utils_1 = require("../../../lib/utils");
const _enums_1 = require("../../../enums/index.js");
const BaseRoundsRenderer_1 = require("./BaseRoundsRenderer");
class RoundBackground extends BaseRoundsRenderer_1.BaseRoundsRenderer {
    constructor() {
        super(...arguments);
        this.bgAnimOffset = 0.19;
        this.borderStyle = {
            left: {
                width: 2,
                offset: [0, 0],
                alpha: 0.33,
            },
            right: {
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
            scale: 0.44,
            speed: 0.33,
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
        return RoundBackground.ROUND_BACKGROUND_ID;
    }
    get animations() {
        return this.configAnimations;
    }
    updateRound(round, context, container) {
        var _a;
        const isHistorical = this.isHistoricalRound(round, context);
        if (!round.openPriceTimestamp || !round.openPriceValue || !isHistorical)
            return this.clear();
        const { width } = context.screen;
        const { timerange } = context.plotdata;
        const { openPriceTimestamp, endDate } = round;
        const rprice = this.getResolutionPricePoint(round, context);
        const rdate = (rprice === null || rprice === void 0 ? void 0 : rprice.timestamp) || endDate;
        const predictions = (_a = context.predictions) === null || _a === void 0 ? void 0 : _a[round.roundid];
        const resolution = this.getRoundResolution(round, context);
        const nocontest = resolution === _enums_1.EPosition.NoContest;
        const hasWonPrediction = predictions && predictions.some(prediction => prediction.position === resolution && isHistorical && !nocontest && !prediction.phantom);
        const hashClaimablePrediction = predictions && predictions.some(prediction => {
            const phantom = prediction.phantom;
            const win = prediction.position === resolution;
            const won = win && isHistorical && !nocontest && !phantom;
            const reverted = _rendering_1.EntityUtils.isEnityReverted(context, prediction.predictionid);
            const propagating = _rendering_1.EntityUtils.isEntityPropagating(context, prediction.predictionid);
            const orphan = phantom && reverted || isHistorical && phantom && !propagating;
            const claimable = !prediction.claimed && (won || nocontest) && !orphan && !phantom;
            return claimable;
        });
        const shouldRenderClaimable = !(0, utils_1.isEmpty)(predictions) && hashClaimablePrediction;
        const [ox, rx] = datamath_1.default.scale([openPriceTimestamp, rdate], timerange, width);
        this.udateDefaultBackground(context, container, [ox, rx], round, !shouldRenderClaimable);
        let bgTextureColorStops;
        if (hasWonPrediction)
            bgTextureColorStops = _config_1.default.style.roundRoundWinColors;
        else if (nocontest)
            bgTextureColorStops = _config_1.default.style.roundRoundNoContestColors;
        this.udateClaimableBackground(context, container, [ox, rx], round, bgTextureColorStops, shouldRenderClaimable);
        let borderTextureColorStops;
        if (hasWonPrediction)
            borderTextureColorStops = _config_1.default.style.roundRoundWinBorderColors;
        else if (nocontest)
            borderTextureColorStops = _config_1.default.style.roundRoundNoContestBorderColors;
        this.updateClaimableBorder(context, container, [ox, rx], round, borderTextureColorStops, shouldRenderClaimable);
        this.updateCoinIcon(context, container, [ox, rx], round, hasWonPrediction, shouldRenderClaimable);
    }
    udateDefaultBackground(context, container, [x1, x2], round, shouldRender) {
        if (!shouldRender) {
            this.clear('backgroundContainer');
            this.clear('background');
            return;
        }
        const { height, width } = context.screen;
        const roundid = round.roundid;
        const [backgroundContainer, backgroundContainerState] = this.get('backgroundContainer', () => new pixi_1.Container());
        if (backgroundContainerState.new) {
            container.addChild(backgroundContainer);
            backgroundContainer.alpha = 0;
        }
        if (!backgroundContainerState.subscribed) {
            backgroundContainerState.subscribed = true;
            context.eventTarget.addEventListener('roundhover', (e) => {
                if (e.roundid !== roundid)
                    return;
                this.rebind(roundid);
                this.animate('backgroundContainer', 'hover_bg', { pixi: { alpha: 1 } });
            });
            context.eventTarget.addEventListener('roundunhover', (e) => {
                if (e.roundid !== roundid)
                    return;
                this.rebind(roundid);
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
                colorStops: _config_1.default.style.roundRoundColors,
            }) })
            .drawPolygon(shape)
            .closePath()
            .endFill();
    }
    updateClaimableBorder(context, container, [x1, x2], round, colorStops, shouldRender) {
        if (!shouldRender) {
            this.clear('borderLeft');
            this.clear('borderRight');
            return;
        }
        const { height } = context.screen;
        const roundid = round.roundid;
        const [borderLeft, borderLeftState] = this.get('borderLeft', () => this.createBorder(context, height, Object.assign(Object.assign({}, this.borderStyle.left), { colorStops })), [height]);
        if (borderLeftState.new)
            container.addChild(borderLeft);
        borderLeft.position.x = x1;
        const [borderRight, borderRightState] = this.get('borderRight', () => this.createBorder(context, height, Object.assign(Object.assign({}, this.borderStyle.right), { colorStops })), [height]);
        if (borderRightState.new)
            container.addChild(borderRight);
        borderRight.position.x = x2;
        if (!borderLeftState.subscribed) {
            borderLeftState.subscribed = true;
            context.eventTarget.addEventListener('roundhover', (e) => {
                if (e.roundid !== roundid)
                    return;
                this.rebind(roundid);
                this.animate('borderLeft', 'hover_border');
                this.animate('borderRight', 'hover_border');
            });
            context.eventTarget.addEventListener('roundunhover', (e) => {
                if (e.roundid !== roundid)
                    return;
                this.rebind(roundid);
                this.animate('borderLeft', 'unhover_border');
                this.animate('borderRight', 'unhover_border');
            });
        }
    }
    udateClaimableBackground(context, container, [x1, x2], round, textureColorStops, shouldRender) {
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
                colorStops: _config_1.default.style.roundRoundBottomColors,
            }) })
            .drawPolygon(shape)
            .closePath()
            .endFill();
        const roundid = round.roundid;
        if (!claimableContainerState.subscribed) {
            claimableContainerState.subscribed = true;
            context.eventTarget.addEventListener('roundhover', (e) => {
                if (e.roundid !== roundid)
                    return;
                this.rebind(roundid);
                this.animate('topContainer', 'hover_bg', { pixi: { y: 0, alpha: this.backgroundStyle.hoverAlpha } });
                this.animate('bottomContainer', 'hover_bg', { pixi: { alpha: this.backgroundStyle.hoverAlpha } });
            });
            context.eventTarget.addEventListener('roundunhover', (e) => {
                if (e.roundid !== roundid)
                    return;
                this.rebind(roundid);
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
    updateCoinIcon(context, container, [x1, x2], round, win, shouldRender) {
        if (!shouldRender) {
            this.clear('iconContainer');
            this.clear('coinShine');
            this.clear('coin');
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
        const { scale, anchor, speed } = this.coinStyle;
        const name = this.getCointAnimationName(context, win);
        const animation = context.textures.animations(name);
        const icon = new pixi_1.AnimatedSprite(animation);
        // animation
        icon.play();
        icon.animationSpeed = speed;
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
    getCointAnimationName(context, win) {
        var _a;
        const key = `${(_a = context.game) === null || _a === void 0 ? void 0 : _a.currency}_${win ? 'GOLD' : 'SILVER'}`;
        switch (key) {
            case 'DEMO_SILVER':
                return textures_1.DEMO_SILVER_TEXTURE;
            case 'DEMO_GOLD':
                return textures_1.DEMO_GOLD_TEXTURE;
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
exports.RoundBackground = RoundBackground;
RoundBackground.ROUND_BACKGROUND_ID = Symbol('ROUND_BACKGROUND_ID');
//# sourceMappingURL=RoundBackground.js.map