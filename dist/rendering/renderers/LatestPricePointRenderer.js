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
            radius: 9,
        };
        this.outerPointAnimation = {
            pixi: {
                scale: 4,
                alpha: -0.1,
            },
            ease: 'power3.out',
            duration: 3.819,
            repeat: -1,
        };
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
        const [outerpoint, outerpointState] = this.get('outerpoint', () => __1.GraphicUtils.createCircle([x, y], this.outerPointStyle.radius, this.outerPointStyle));
        if (outerpointState.new)
            container.addChild(outerpoint);
        outerpoint.position.set(x, y);
        if (outerpointState.amination !== 'puls') {
            outerpointState.amination = 'puls';
            outerpointState.timeline = pixi_1.gsap.to(outerpoint, this.outerPointAnimation);
        }
        const [innerpoint, innerpointState] = this.get('innerpoint', () => __1.GraphicUtils.createCircle([x, y], this.innerPointStyle.radius, this.innerPointStyle));
        if (innerpointState.new)
            container.addChild(innerpoint);
        innerpoint.position.set(x, y);
        return container;
    }
}
exports.LatestPricePointRenderer = LatestPricePointRenderer;
LatestPricePointRenderer.LATEST_PRICE_POINT_ID = Symbol('LATEST_PRICE_POINT_ID');
//# sourceMappingURL=LatestPricePointRenderer.js.map