"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolRenderer = void 0;
const __1 = require("../..");
const __2 = require("../..");
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
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
            outterr: 5,
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
            paddingBottom: 20,
            linestyle: Object.assign(Object.assign({}, basicLineStyle), { color: 0xF05350 }),
            torusstyle: Object.assign(Object.assign({}, basicTorusStyle), { color: 0xF05350 }),
            coveredNameStyle: Object.assign(Object.assign({}, basicCoveredTextStyle), { textstyle: Object.assign(Object.assign({}, basicTextNameStyle), { fill: 0xFFFFFF }), color: 0xF05350, anchorx: 0, anchory: 0 }),
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
                paddingx: 7,
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
        if (!context.pool)
            return new pixi_1.Graphics();
        const { lockDate, openDate, resolutionDate, openPrice, } = context.pool;
        const { xrange, yrange, } = context.plotdata;
        const { width, height, } = context.screen;
        const result = new pixi_1.Graphics();
        const [ox, rx] = datamath_1.default.scale([openDate, resolutionDate], xrange, width);
        const shape = [
            ox, 0,
            rx, 0,
            rx, height,
            ox, height,
        ];
        const gradient = new pixi_1.Graphics();
        gradient.beginTextureFill({
            texture: context.textures.get(__2.POOL_ROUND_TEXTURE),
            alpha: 0.07,
        });
        gradient.drawPolygon(shape);
        gradient.closePath();
        gradient.endFill();
        result.addChild(gradient);
        this.lockPoolStyle.coveredIconStyle.texture = context.textures.get(__2.LOCK_ICON_TEXTURE);
        result.addChild(this.createPoolBorder(context, 'Start', openDate, this.openPoolStyle), this.createLockLine(context, lockDate, this.lockPoolStyle), this.createPoolBorder(context, 'Resolution', resolutionDate, this.resolutionPoolStyle));
        if (openPrice) {
            result.addChild(this.createPrice(context, openPrice, this.openPricePointStyle));
        }
        return result;
    }
    createPrice(context, pricePoint, { circlstyle, linestyle, textCoverStyle }) {
        const { xrange, yrange, } = context.plotdata;
        const { width, height, } = context.screen;
        const [x] = datamath_1.default.scale([pricePoint.timestamp], xrange, width);
        const [y] = datamath_1.default.scaleReverse([pricePoint.value], yrange, height);
        const outer = __1.GraphicUtils.createCircle([x, y], circlstyle.outer.radius, circlstyle.outer);
        const inner = __1.GraphicUtils.createCircle([x, y], circlstyle.inner.radius, circlstyle.inner);
        const line = __1.GraphicUtils.createLine([0, y], [width, y], linestyle);
        const coveredText = __1.GraphicUtils.createCoveredText(datamath_1.default.toFixedPrecision(pricePoint.value, 8), [width, y], textCoverStyle);
        const price = new pixi_1.Graphics();
        price.addChild(line, outer, inner, coveredText);
        return price;
    }
    createLockLine(context, poolDate, style) {
        const { xrange, } = context.plotdata;
        const { width, height, } = context.screen;
        const { paddingTop, paddingBottom } = style;
        const [x] = datamath_1.default.scale([poolDate], xrange, width);
        const { coveredIconStyle } = style;
        const { linePadding: coverpadding } = coveredIconStyle;
        const coveredIcon = __1.GraphicUtils.createCoveredIcon([x + coverpadding, paddingTop], coveredIconStyle);
        const covery = coveredIcon.y + coveredIcon.height;
        const { torusstyle } = style;
        const torus = __1.GraphicUtils.createTorus([x, covery], [torusstyle.innerr, torusstyle.outterr], torusstyle);
        const torusy = torus.y + torusstyle.outterr;
        const { linestyle } = style;
        const { torusPadding } = linestyle;
        const line = __1.GraphicUtils.createVerticalDashLine(x, [torusy + torusPadding, height - paddingBottom], style.linestyle);
        const pool = new pixi_1.Graphics();
        pool.addChild(line, torus, coveredIcon);
        return pool;
    }
    createPoolBorder(context, title, poolDate, style) {
        const { xrange, } = context.plotdata;
        const { width, height, } = context.screen;
        const { paddingTop, paddingBottom } = style;
        const [x] = datamath_1.default.scale([poolDate], xrange, width);
        const { coveredNameStyle } = style;
        const { linePadding: coverpadding } = coveredNameStyle;
        const coveredName = __1.GraphicUtils.createCoveredText(title, [x + coverpadding, paddingTop], coveredNameStyle);
        const covery = coveredName.y + coveredName.height;
        const { torusstyle } = style;
        const torus = __1.GraphicUtils.createTorus([x, covery], [torusstyle.innerr, torusstyle.outterr], torusstyle);
        const torusy = torus.y + torusstyle.outterr;
        const { linestyle } = style;
        const { torusPadding } = linestyle;
        const line = __1.GraphicUtils.createVerticalDashLine(x, [torusy + torusPadding, height - paddingBottom], style.linestyle);
        const pool = new pixi_1.Graphics();
        pool.addChild(line, torus, coveredName);
        return pool;
    }
}
exports.PoolRenderer = PoolRenderer;
PoolRenderer.POOL_ID = Symbol('POOL_ID');
//# sourceMappingURL=PoolRenderer.js.map