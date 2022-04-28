"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LatestPricePointRenderer = void 0;
const sprite_animated_1 = require("@pixi/sprite-animated");
const __1 = require("..");
const config_1 = __importDefault(require("../../config"));
const datamath_1 = __importDefault(require("../../lib/datamath"));
const pixi_1 = require("../../lib/pixi");
const symbols_1 = require("../textures/symbols");
class LatestPricePointRenderer extends __1.BaseRenderer {
    constructor(renderer) {
        super(renderer);
        this.innerPointStyle = {
            color: 0xFFFFFF,
            radius: 4,
        };
        this.outerPointStyle = {
            color: config_1.default.style.linecolor,
            radius: 10,
        };
    }
    get rendererId() {
        return LatestPricePointRenderer.LATEST_PRICE_POINT_ID;
    }
    create(context) {
        const { xlast, ylast, xrange, yrange, } = context.plotdata;
        const { width, height, } = context.screen;
        const [x] = datamath_1.default.scale([xlast], xrange, width);
        const [yr] = datamath_1.default.scale([ylast], yrange, height);
        const y = height - yr;
        const outerpoint = new sprite_animated_1.AnimatedSprite(context.textures.get(symbols_1.LATEST_PRICE_POINT_TEXTURES), true);
        outerpoint.position.set(x, y);
        outerpoint.anchor.set(0.5);
        outerpoint.animationSpeed = 0.5;
        outerpoint.play();
        const innerpoint = __1.GraphicUtils.createCircle([x, y], this.innerPointStyle.radius, this.innerPointStyle);
        const result = new pixi_1.Graphics();
        result.addChild(outerpoint, innerpoint);
        return result;
    }
}
exports.LatestPricePointRenderer = LatestPricePointRenderer;
LatestPricePointRenderer.LATEST_PRICE_POINT_ID = Symbol('LATEST_PRICE_POINT_ID');
//# sourceMappingURL=LatestPricePointRenderer.js.map