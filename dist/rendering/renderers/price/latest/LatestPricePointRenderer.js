"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LatestPricePointRenderer = void 0;
const __1 = require("../../..");
const config_1 = __importDefault(require("../../../../config"));
const pixi_1 = require("../../../../lib/pixi");
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
        this.pulspointStyle = {
            color: config_1.default.style.linecolor,
            radius: 10,
        };
        this.pulspointAnimation = {
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
        const { xs, ys, } = context.plotdata;
        const x = Number(xs.at(-1));
        const y = Number(ys.at(-1));
        const [point, pointState] = this.get('point', () => __1.GraphicUtils.createCircle([x, y], this.outerPointStyle.radius, this.outerPointStyle));
        if (pointState.new)
            container.addChild(point);
        point.position.set(x, y);
        const [pulspoint, pulspointState] = this.get('pulspoint', () => __1.GraphicUtils.createCircle([0, 0], this.pulspointStyle.radius, this.pulspointStyle));
        if (pulspointState.new)
            point.addChild(pulspoint);
        if (pulspointState.amination !== 'puls') {
            pulspointState.amination = 'puls';
            pulspointState.timeline = pixi_1.gsap.to(pulspoint, this.pulspointAnimation);
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