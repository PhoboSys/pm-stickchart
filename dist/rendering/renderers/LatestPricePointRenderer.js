"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LatestPricePointRenderer = void 0;
const __1 = require("..");
const config_1 = __importDefault(require("../../config"));
const datamath_1 = __importDefault(require("../../lib/datamath"));
const pixi_1 = require("../../lib/pixi");
class LatestPricePointRenderer extends __1.BaseRenderer {
    constructor(renderer) {
        super(renderer);
        this.innerPointStyle = {
            color: 0xFFFFFF,
            radius: 4,
        };
        this.outerPointStyle = {
            color: config_1.default.style.linecolor,
            radius: 20,
            alpha: 0,
        };
        this.outerPointTween = pixi_1.gsap.to(this.outerPointStyle, { radius: 4, alpha: 1, duration: 1, repeat: -1, runBackwards: true });
        pixi_1.Ticker.shared.add(() => {
            const [outterpoint] = this.get('outterPoint') || [];
            if (!outterpoint)
                return;
            outterpoint
                .clear()
                .beginFill(this.outerPointStyle.color)
                .drawCircle(0, 0, this.outerPointStyle.radius)
                .endFill();
            outterpoint.alpha = this.outerPointStyle.alpha;
        });
    }
    get rendererId() {
        return LatestPricePointRenderer.LATEST_PRICE_POINT_ID;
    }
    update(context, container) {
        const { xlast, ylast, xrange, yrange, } = context.plotdata;
        const { width, height, } = context.screen;
        const [x] = datamath_1.default.scale([xlast], xrange, width);
        const [yr] = datamath_1.default.scale([ylast], yrange, height);
        const y = height - yr;
        const [outerpoint] = this.use('outterPoint', () => __1.GraphicUtils.createCircle([0, 0], this.outerPointStyle.radius, this.outerPointStyle));
        outerpoint.position.set(x, y);
        const [innerpoint] = this.use('innerPoint', () => __1.GraphicUtils.createCircle([0, 0], this.innerPointStyle.radius, this.innerPointStyle));
        innerpoint.position.set(x, y);
        container.addChild(outerpoint, innerpoint);
        return container;
    }
}
exports.LatestPricePointRenderer = LatestPricePointRenderer;
LatestPricePointRenderer.LATEST_PRICE_POINT_ID = Symbol('LATEST_PRICE_POINT_ID');
//# sourceMappingURL=LatestPricePointRenderer.js.map