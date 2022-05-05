"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceLineRenderer = void 0;
const __1 = require("..");
const __2 = require("..");
const config_1 = __importDefault(require("../../config"));
const datamath_1 = __importDefault(require("../../lib/datamath"));
const pixi_1 = require("../../lib/pixi");
class PriceLineRenderer extends __1.BaseRenderer {
    constructor(storage) {
        super(storage);
        this.anim = { rate: 0 };
        this.lineStyle = {
            width: config_1.default.style.linesize,
            color: config_1.default.style.linecolor,
            alpha: 1,
            join: 'round',
            cap: 'round',
        };
        this.performContainer();
    }
    performContainer() {
        const [pricelineLatest] = this.use('pricelineLatest', () => new pixi_1.Graphics());
        const [gradientLatest] = this.use('gradientLatest', () => new pixi_1.Graphics());
        const [priceline] = this.use('priceline', () => new pixi_1.Graphics());
        const [gradient] = this.use('gradient', () => new pixi_1.Graphics());
        const container = this.storage.get(this.rendererId);
        container.addChild(priceline, gradient, pricelineLatest, gradientLatest);
    }
    get rendererId() {
        return PriceLineRenderer.PRICE_LINE_ID;
    }
    update(context, container) {
        var _a, _b;
        const shouldAnimate = ((_b = (_a = this.context) === null || _a === void 0 ? void 0 : _a.plotdata) === null || _b === void 0 ? void 0 : _b.xlast) !== context.plotdata.xlast;
        if (shouldAnimate) {
            this.animateLatestLine();
        }
        this.context = context;
        this.updatePriceline(context);
        this.updateLatest(context);
        return container;
    }
    animateLatestLine() {
        if (!this.context)
            return;
        this.performTween();
        this.performTicker();
    }
    performTween() {
        this.anim = { rate: 0 };
        this.tween = pixi_1.gsap.to(this.anim, { rate: 1, duration: .5 });
    }
    performTicker() {
        const ticker = new pixi_1.Ticker();
        ticker.add(() => {
            var _a;
            if (!((_a = this.tween) === null || _a === void 0 ? void 0 : _a.isActive())) {
                return ticker.destroy();
            }
            this.updateLatest(this.context);
        });
        ticker.start();
    }
    updateLatest(context) {
        const { width, height } = context.screen;
        const { xdata, xrange, ydata, yrange } = context.plotdata;
        const [xlastTwo, ylastTwo] = [xdata.slice(-2), ydata.slice(-2)];
        const [prevx, curx] = datamath_1.default.scale(xlastTwo, xrange, width);
        const [prevy, cury] = datamath_1.default.scale(ylastTwo, yrange, height, true);
        const to = (prev, cur) => prev + (cur - prev) * this.anim.rate;
        const [endx, endy] = [to(prevx, curx), to(prevy, cury)];
        const [line] = this.get('pricelineLatest');
        line
            .clear()
            .lineStyle(this.lineStyle)
            .moveTo(prevx, prevy)
            .lineTo(endx, endy);
        const [gradient] = this.get('gradientLatest');
        gradient
            .clear()
            .beginTextureFill({
            texture: context.textures.get(__2.PRICE_LINE_TEXTURE),
            alpha: 0.5,
        })
            .drawPolygon(prevx, height, prevx, prevy, endx, endy, endx, height)
            .endFill();
    }
    updatePriceline(context) {
        const { width, height } = context.screen;
        const { xdata, xrange, ydata, yrange } = context.plotdata;
        const xs = datamath_1.default.scale(xdata, xrange, width);
        const ys = datamath_1.default.scale(ydata, yrange, height, true);
        const [priceline] = this.get('priceline');
        priceline
            .clear()
            .lineStyle(this.lineStyle);
        const shape = [];
        for (let i = 0; i < xs.length - 1; i++) {
            const x = xs[i], y = ys[i];
            if (i === 0) {
                shape.push(x, height, x, y);
                priceline.moveTo(x, y);
                continue;
            }
            if (config_1.default.style.rectunged) {
                priceline.lineTo(x, ys[i - 1]);
                shape.push(x, ys[i - 1]);
            }
            priceline.lineTo(x, y);
            shape.push(x, y);
        }
        shape.push(xs.at(-2), height);
        const [gradient] = this.get('gradient');
        gradient
            .clear()
            .beginTextureFill({
            texture: context.textures.get(__2.PRICE_LINE_TEXTURE),
            alpha: 0.5,
        })
            .drawPolygon(shape)
            .endFill();
    }
}
exports.PriceLineRenderer = PriceLineRenderer;
PriceLineRenderer.PRICE_LINE_ID = Symbol('PRICE_LINE_ID');
//# sourceMappingURL=PriceLineRenderer.js.map