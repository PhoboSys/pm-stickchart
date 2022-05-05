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
    constructor(renderer) {
        super(renderer);
        this.lineStyle = {
            width: config_1.default.style.linesize,
            color: config_1.default.style.linecolor,
            alpha: 1,
            join: 'round',
            cap: 'round',
        };
        this.use('latestAnimationLine', () => new pixi_1.Graphics());
    }
    get rendererId() {
        return PriceLineRenderer.PRICE_LINE_ID;
    }
    render(context, done) {
        this.context = context;
        super.render(context, done);
    }
    update(context, container) {
        const { xlast } = context.plotdata;
        if (this.xlast !== xlast) {
            console.log('start animation');
            this.animateLatestLine();
        }
        this.xlast = xlast;
        return this.renderLines(context, container);
    }
    animateLatestLine() {
        if (!this.context)
            return;
        this.anim = { rate: 0 };
        const tween = pixi_1.gsap.to(this.anim, { rate: 1, duration: 5 });
        this.ticker = new pixi_1.Ticker();
        this.ticker.add(() => {
            const [line] = this.get('latestAnimationLine');
            if (!tween.isActive()) {
                return this.ticker.destroy();
                // return this.render(context, () => { line.clear() })
            }
            console.log('animate2');
            const { context } = this;
            const { width, height } = context.screen;
            const { xdata, xrange, ydata, yrange } = context.plotdata;
            const [prevx, curx] = datamath_1.default.scale([xdata.at(-2), xdata.at(-1)], xrange, width);
            const [prevy, cury] = datamath_1.default.scale([ydata.at(-2), ydata.at(-1)], yrange, height, true);
            const animate = (prev, cur) => prev + (cur - prev) * this.anim.rate;
            line
                .clear()
                .lineStyle(Object.assign(Object.assign({}, this.lineStyle), { color: 0xFFFFFF }))
                .moveTo(prevx, prevy)
                .lineTo(animate(prevx, curx), animate(prevy, cury));
        });
        this.ticker.start();
    }
    renderLines(context, container) {
        const { width, height } = context.screen;
        const { xdata, ydata } = context.plotdata;
        const { xrange, yrange } = context.plotdata;
        const xs = datamath_1.default.scale(xdata, xrange, width);
        const ys = datamath_1.default.scale(ydata, yrange, height, true);
        const [priceline, plstate] = this.use('priceline', () => new pixi_1.Graphics());
        if (!plstate.new)
            priceline.clear();
        priceline.lineStyle(this.lineStyle);
        const shape = [];
        for (let i = 0; i < xs.length; i++) {
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
        shape.push(xs.at(-1), height);
        const [gradient] = this.use('gradient', () => new pixi_1.Graphics());
        gradient
            .clear()
            .beginTextureFill({
            texture: context.textures.get(__2.PRICE_LINE_TEXTURE),
            alpha: 0.5,
        })
            .drawPolygon(shape)
            .endFill();
        const [animtedline] = this.get('latestAnimationLine');
        container.addChild(priceline, gradient, animtedline);
        return container;
    }
}
exports.PriceLineRenderer = PriceLineRenderer;
PriceLineRenderer.PRICE_LINE_ID = Symbol('PRICE_LINE_ID');
//# sourceMappingURL=PriceLineRenderer.js.map