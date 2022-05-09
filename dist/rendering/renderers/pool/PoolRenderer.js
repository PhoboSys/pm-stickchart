"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolRenderer = void 0;
const config_1 = __importDefault(require("../../../config"));
const __1 = require("../..");
const __2 = require("../..");
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
const poollevels_1 = require("../../../constants/poollevels");
class PoolRenderer extends __1.BaseRenderer {
    constructor(renderer) {
        super(renderer);
        const basicLineStyle = {
            width: 2,
            alpha: 0.7,
            join: 'round',
            cap: 'round',
            torusPadding: 5,
            gap: 10,
            dash: 10,
        };
        const basicTorusStyle = {
            innerr: 2.5,
            outerr: 5,
        };
        const basicTextNameStyle = {
            fontWeight: 600,
            fontFamily: 'Gilroy',
            fontSize: 12,
        };
        const basicCoveredTextStyle = {
            radius: 20,
            paddingx: 10,
            paddingy: 5,
            linePadding: 5,
        };
        this.lockPoolStyle = {
            paddingTop: 20,
            paddingBottom: 20,
            linestyle: Object.assign(Object.assign({}, basicLineStyle), { color: 0xFFA000 }),
            torusstyle: Object.assign(Object.assign({}, basicTorusStyle), { color: 0xFFA000 }),
            coveredIconStyle: Object.assign(Object.assign({}, basicCoveredTextStyle), { radius: 8, paddingx: 7, iconstyle: {
                    size: 13,
                }, color: 0xFFA000, anchorx: 0, anchory: 0 }),
        };
        this.resolutionPoolStyle = {
            paddingTop: 20,
            paddingBottom: 10,
            linestyle: Object.assign({}, basicLineStyle),
            torusstyle: Object.assign(Object.assign({}, basicTorusStyle), { color: 0xF05350 }),
            coveredNameStyle: Object.assign(Object.assign({}, basicCoveredTextStyle), { textstyle: Object.assign(Object.assign({}, basicTextNameStyle), { fill: config_1.default.style.background }), color: 0xF05350, anchorx: 0, anchory: 0 }),
        };
        this.openPoolStyle = {
            paddingTop: 20,
            paddingBottom: 20,
            linestyle: Object.assign(Object.assign({}, basicLineStyle), { color: 0xB7BDD7 }),
            torusstyle: Object.assign(Object.assign({}, basicTorusStyle), { color: 0xB7BDD7 }),
            coveredNameStyle: Object.assign(Object.assign({}, basicCoveredTextStyle), { textstyle: Object.assign(Object.assign({}, basicTextNameStyle), { fill: 0xB7BDD7 }), linestyle: {
                    color: 0xB7BDD7,
                    width: 1,
                }, linePadding: -5, color: 0x22273F, bordercolor: 0xB7BDD7, anchorx: 1, anchory: 0 }),
        };
        this.openPricePointStyle = {
            circlstyle: {
                inner: {
                    color: 0x303550,
                    radius: 3,
                    alpha: 1,
                },
                outer: {
                    radius: 6,
                    color: 0xB7BDD7,
                    alpha: 1,
                },
            },
            linestyle: {
                color: 0xB7BDD7,
                width: 1,
                alpha: 0.7,
            },
            textCoverStyle: {
                color: 0x22273F,
                paddingx: 8,
                paddingy: 5,
                anchorx: 1.1,
                anchory: 0.5,
                radius: 30,
                textstyle: {
                    fill: 0xB7BDD7,
                    fontWeight: 600,
                    fontFamily: 'Gilroy',
                    fontSize: 13,
                },
                linestyle: {
                    color: 0xB7BDD7,
                    width: 1,
                },
            },
        };
    }
    get rendererId() {
        return PoolRenderer.POOL_ID;
    }
    update(context, container) {
        if (!context.pool) {
            this.clear();
            return container;
        }
        const { lockDate, openDate, resolutionDate, openPrice, } = context.pool;
        const { timerange, pricerange, } = context.plotdata;
        const { width, height, } = context.screen;
        const [ox, rx] = datamath_1.default.scale([openDate, resolutionDate], timerange, width);
        const shape = [
            ox, 0,
            rx, 0,
            rx, height,
            ox, height,
        ];
        const [gradient, gradientState] = this.get('gradient', () => new pixi_1.Graphics());
        if (gradientState.new)
            container.addChild(gradient);
        gradient
            .clear()
            .beginTextureFill({
            texture: context.textures.get(__2.POOL_ROUND_TEXTURE),
            alpha: 0.07,
        })
            .drawPolygon(shape)
            .closePath()
            .endFill();
        const [lock, lockState] = this.createLockLine(context, lockDate, this.lockPoolStyle);
        if (lockState.new)
            container.addChild(lock);
        const [start, startState] = this.createPoolBorder(context, 'Start', openDate, this.openPoolStyle);
        if (startState.new)
            container.addChild(start);
        this.updateResolutionPool(context, container);
        const [price, priceState] = this.createPrice(context, openPrice, this.openPricePointStyle);
        if (priceState.new)
            container.addChild(price);
        this._context = context;
        return container;
    }
    createPrice(context, pricePoint, { circlstyle, linestyle, textCoverStyle }) {
        const { timerange, pricerange, } = context.plotdata;
        const { width, height, } = context.screen;
        const [priceline, pricelineState] = this.get('priceline', () => new pixi_1.Container());
        if (!pricePoint) {
            this.clear('outerPrice');
            this.clear('innerPrice');
            this.clear('linePrice');
            this.clear('coveredTextPrice');
            return [priceline, pricelineState];
        }
        const [x] = datamath_1.default.scale([pricePoint.timestamp], timerange, width);
        const [y] = datamath_1.default.scaleReverse([pricePoint.value], pricerange, height);
        const [outer, outerState] = this.get('outerPrice', () => __1.GraphicUtils.createCircle([x, y], circlstyle.outer.radius, circlstyle.outer));
        outer.position.set(x, y);
        const [inner, innerState] = this.get('innerPrice', () => __1.GraphicUtils.createCircle([x, y], circlstyle.inner.radius, circlstyle.inner));
        inner.position.set(x, y);
        const [line, lineState] = this.get('linePrice', () => __1.GraphicUtils.createLine([0, 0], [width, 0], linestyle));
        line.position.set(0, y);
        line.width = width;
        const [coveredText, coveredTextState] = this.get('coveredTextPrice', () => __1.GraphicUtils.createCoveredText(datamath_1.default.toFixedPrecision(pricePoint.value, 8), [width, y], textCoverStyle));
        const textGraphic = coveredText.getChildAt(1);
        const price = datamath_1.default.toFixedPrecision(pricePoint.value, 8);
        if (textGraphic.text !== price) {
            textGraphic.text = price;
            const { paddingx, paddingy } = textCoverStyle;
            const coverGraphic = coveredText.getChildAt(0);
            coverGraphic.width = textGraphic.width + paddingx * 2;
            coverGraphic.height = textGraphic.height + paddingy * 2;
        }
        const { anchorx, anchory } = textCoverStyle;
        coveredText.position.set(width - coveredText.width * anchorx, y - coveredText.height * anchory);
        if (lineState.new)
            priceline.addChild(line);
        if (outerState.new)
            priceline.addChild(outer);
        if (innerState.new)
            priceline.addChild(inner);
        if (coveredTextState.new)
            priceline.addChild(coveredText);
        return [priceline, pricelineState];
    }
    createLockLine(context, poolDate, style) {
        const { timerange, } = context.plotdata;
        const { width, height, } = context.screen;
        const [poolline, poollineState] = this.get('poollineLock', () => new pixi_1.Container());
        const { paddingTop, paddingBottom } = style;
        const [x] = datamath_1.default.scale([poolDate], timerange, width);
        const { coveredIconStyle } = style;
        coveredIconStyle.texture = context.textures.get(__2.LOCK_ICON_TEXTURE);
        const { linePadding: coverpadding } = coveredIconStyle;
        const [coveredIcon, coveredIconState] = this.get('coveredIcon', () => __1.GraphicUtils.createCoveredIcon([x + coverpadding, paddingTop], coveredIconStyle));
        const { anchorx, anchory } = coveredIconStyle;
        coveredIcon.position.set((x + coverpadding) - coveredIcon.width * anchorx, paddingTop - coveredIcon.height * anchory);
        const covery = coveredIcon.y + coveredIcon.height;
        const { torusstyle } = style;
        const [torus, torusState] = this.get('torusLock', () => __1.GraphicUtils.createTorus([x, covery], [torusstyle.innerr, torusstyle.outerr], torusstyle));
        torus.position.set(x, covery);
        const torusy = torus.y + torusstyle.outerr;
        const { linestyle } = style;
        const { torusPadding } = linestyle;
        const [line, lineState] = this.get('lineLock', () => __1.GraphicUtils.createVerticalDashLine(0, [torusy + torusPadding, height - paddingBottom], style.linestyle));
        line.position.set(x, 0);
        line.height = height - (paddingBottom + torusy + torusPadding);
        if (lineState.new)
            poolline.addChild(line);
        if (torusState.new)
            poolline.addChild(torus);
        if (coveredIconState.new)
            poolline.addChild(coveredIcon);
        return [poolline, poollineState];
    }
    createPoolBorder(context, title, poolDate, style) {
        const { timerange, } = context.plotdata;
        const { width, height, } = context.screen;
        const [poolline, poollineState] = this.get('poolline' + title, () => new pixi_1.Container());
        const { paddingTop, paddingBottom } = style;
        const [x] = datamath_1.default.scale([poolDate], timerange, width);
        const { coveredNameStyle } = style;
        const { linePadding: coverpadding } = coveredNameStyle;
        const [coveredName, coveredNameState] = this.get('cover' + title, () => __1.GraphicUtils.createCoveredText(title, [x + coverpadding, paddingTop], coveredNameStyle));
        const { anchorx, anchory } = coveredNameStyle;
        coveredName.position.set((x + coverpadding) - coveredName.width * anchorx, paddingTop - coveredName.height * anchory);
        const covery = coveredName.y + coveredName.height;
        const { torusstyle } = style;
        const [torus, torusState] = this.get('torus' + title, () => __1.GraphicUtils.createTorus([x, covery], [torusstyle.innerr, torusstyle.outerr], torusstyle));
        torus.position.set(x, covery);
        const torusy = torus.y + torusstyle.outerr;
        const { linestyle } = style;
        const { torusPadding } = linestyle;
        const [line, lineState] = this.get('line' + title, () => __1.GraphicUtils.createVerticalDashLine(0, [torusy + torusPadding, height - paddingBottom], style.linestyle));
        line.position.set(x, 0);
        line.height = height - (paddingBottom + torusy + torusPadding);
        if (lineState.new)
            poolline.addChild(line);
        if (torusState.new)
            poolline.addChild(torus);
        if (coveredNameState.new)
            poolline.addChild(coveredName);
        return [poolline, poollineState];
    }
    getLevelGradientColors(context) {
        switch (context.pool.level) {
            case poollevels_1.ROYAL:
                return config_1.default.style.levels.royalColors;
            case poollevels_1.SILVER:
                return config_1.default.style.levels.silverColors;
            case poollevels_1.GOLD:
                return config_1.default.style.levels.goldColors;
            default:
                throw Error('pool level is not supported');
        }
    }
    updateResolutionPool(context, container) {
        if (this._context && this._context.screen !== context.screen) {
            this.clear('resolutionDashLine');
        }
        const { timerange, } = context.plotdata;
        const { width, } = context.screen;
        const { paddingTop } = this.resolutionPoolStyle;
        const [x] = datamath_1.default.scale([context.pool.resolutionDate], timerange, width);
        const [cover, coverstate] = this.get('resolutionTextCover', () => this.createResolutionCover(context));
        if (coverstate.new) {
            container.addChild(cover);
            cover.position.y = paddingTop;
        }
        const { linePadding } = this.resolutionPoolStyle.coveredNameStyle;
        cover.position.x = x + linePadding;
        const [torus, torusstate] = this.get('resolutionTorus', () => this.createResolutionTorus(context));
        if (torusstate.new) {
            container.addChild(torus);
            torus.position.y = cover.position.y + cover.height;
        }
        torus.position.x = x;
        const { outerr } = this.resolutionPoolStyle.torusstyle;
        const { torusPadding } = this.resolutionPoolStyle.linestyle;
        const linestarty = torus.position.y + outerr + torusPadding;
        const [line, linestate] = this.get('resolutionLine', () => this.createResolutionDash(context, linestarty));
        if (linestate.new)
            container.addChild(line);
        line.position.x = x;
        return container;
    }
    createResolutionCover(context) {
        const { coveredNameStyle } = this.resolutionPoolStyle;
        const { paddingx, paddingy, radius } = coveredNameStyle;
        const text = new pixi_1.Text('Resolution', coveredNameStyle.textstyle);
        text.position.set(paddingx, paddingy);
        const width = text.width + paddingx * 2;
        const height = text.height + paddingy * 2;
        const coverGradient = pixi_1.GradientFactory.createLinearGradient(context.renderer, pixi_1.RenderTexture.create({ width, height }), {
            x0: 0,
            y0: -height * .5,
            x1: width,
            y1: height * 1.5,
            colorStops: this.getLevelGradientColors(context)
        });
        const cover = new pixi_1.Graphics()
            .beginTextureFill({ texture: coverGradient })
            .drawRoundedRect(0, 0, width, height, radius)
            .endFill();
        const coveredText = new pixi_1.Graphics();
        coveredText.addChild(cover, text);
        return coveredText;
    }
    createResolutionTorus(context) {
        const { innerr, outerr } = this.resolutionPoolStyle.torusstyle;
        const size = outerr * 2;
        const gradient = pixi_1.GradientFactory.createLinearGradient(context.renderer, pixi_1.RenderTexture.create({ width: size, height: size }), {
            x0: 0,
            y0: size,
            x1: size,
            y1: 0,
            colorStops: this.getLevelGradientColors(context)
        });
        const torus = new pixi_1.Graphics()
            .beginTextureFill({ texture: gradient, })
            .drawTorus(0, 0, innerr, outerr)
            .endFill();
        return torus;
    }
    createResolutionDash(context, starty) {
        const { height } = context.screen;
        const { width: linewidth } = this.resolutionPoolStyle.linestyle;
        const [gradient] = this.get('resolutionDashGradient', () => pixi_1.GradientFactory.createLinearGradient(context.renderer, pixi_1.RenderTexture.create({ height: context.screen.height, width: linewidth }), {
            x0: linewidth,
            y0: height,
            x1: 0,
            y1: 0,
            colorStops: this.getLevelGradientColors(context)
        }));
        const { paddingBottom, linestyle } = this.resolutionPoolStyle;
        const dash = __1.GraphicUtils.createTexturedVerticalDashLine(0, [starty, height - paddingBottom], Object.assign(Object.assign({}, linestyle), { texture: gradient }));
        return dash;
    }
}
exports.PoolRenderer = PoolRenderer;
PoolRenderer.POOL_ID = Symbol('POOL_ID');
//# sourceMappingURL=PoolRenderer.js.map