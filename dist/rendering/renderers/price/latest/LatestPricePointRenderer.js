"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LatestPricePointRenderer = void 0;
const _rendering_1 = require("../../../index.js");
const _config_1 = __importDefault(require("../../../../config.js"));
class LatestPricePointRenderer extends _rendering_1.BaseRenderer {
    constructor(renderer) {
        super(renderer);
        this.configAnimations = {
            pulse: {
                pixi: {
                    scale: 3,
                    alpha: -0.1,
                },
                ease: 'power3.out',
                duration: 3.819,
                repeat: -1,
            },
            pulse_inner: {
                pixi: {
                    scale: 1.2,
                    alpha: .9,
                },
                ease: 'power3.out',
                duration: 3.819,
                repeat: -1,
            }
        };
        this.innerPointStyle = {
            color: 0x0527F2,
            radius: 5,
        };
        this.outerPointStyle = {
            color: _config_1.default.style.linecolor,
            radius: 8,
        };
        this.pulspointStyle = {
            color: _config_1.default.style.linecolor,
            radius: 10,
        };
    }
    get animations() {
        return this.configAnimations;
    }
    get rendererId() {
        return LatestPricePointRenderer.LATEST_PRICE_POINT_ID;
    }
    update(context, container) {
        const { latestX, latestY, } = context.plotdata;
        const x = latestX;
        const y = latestY;
        const [outerpoint, outerpointState] = this.get('outerpoint', () => _rendering_1.GraphicUtils.createCircle([x, y], this.outerPointStyle.radius, this.outerPointStyle));
        if (outerpointState.new)
            container.addChild(outerpoint);
        outerpoint.position.set(x, y);
        const [pulspoint, pulspointState] = this.get('pulspoint', () => _rendering_1.GraphicUtils.createCircle([0, 0], this.pulspointStyle.radius, this.pulspointStyle));
        if (pulspointState.new)
            outerpoint.addChild(pulspoint);
        const [innerpoint, innerpointState] = this.get('innerpoint', () => _rendering_1.GraphicUtils.createCircle([x, y], this.innerPointStyle.radius, this.innerPointStyle));
        if (innerpointState.new)
            container.addChild(innerpoint);
        innerpoint.position.set(x, y);
        this.animate('pulspoint', 'pulse');
        this.animate('innerpoint', 'pulse_inner');
        return container;
    }
}
exports.LatestPricePointRenderer = LatestPricePointRenderer;
LatestPricePointRenderer.LATEST_PRICE_POINT_ID = Symbol('LATEST_PRICE_POINT_ID');
//# sourceMappingURL=LatestPricePointRenderer.js.map