"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolLeftOpenTimeRenderer = void 0;
const __1 = require("../..");
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
const symbols_1 = require("../../textures/symbols");
class PoolLeftOpenTimeRenderer extends __1.BaseRenderer {
    constructor(renderer) {
        super(renderer);
        this.style = {
            paddingTop: 34,
            paddingBottom: 34,
        };
    }
    get rendererId() {
        return PoolLeftOpenTimeRenderer.POOL_LEFT_OPEN_TIME_ID;
    }
    hideContainer(container) {
        container.alpha = 0;
        return container;
    }
    update(context, container) {
        if (!context.pool)
            return this.hideContainer(container);
        const { width, height, } = context.screen;
        const { lockDate } = context.pool;
        const { timerange, xs } = context.plotdata;
        const [lx] = datamath_1.default.scale([lockDate], timerange, width);
        const cx = Number(xs.at(-1));
        if (cx > lx)
            return this.hideContainer(container);
        const { paddingTop, paddingBottom } = this.style;
        const shape = [
            0, paddingTop,
            lx - cx, paddingTop,
            lx - cx, height - paddingBottom,
            0, height - paddingBottom,
        ];
        const [gradient, gradientState] = this.get('gradient', () => new pixi_1.Graphics()
            .beginTextureFill({
            texture: context.textures.get(symbols_1.LEFT_OPEN_TIME_TEXTURE, this.style),
        })
            .drawPolygon(shape)
            .closePath()
            .endFill());
        gradient.position.x = cx;
        gradient.width = lx - cx;
        gradient.height = height - paddingBottom - paddingTop;
        if (gradientState.new)
            container.addChild(gradient);
        container.alpha = 1;
        return container;
    }
}
exports.PoolLeftOpenTimeRenderer = PoolLeftOpenTimeRenderer;
PoolLeftOpenTimeRenderer.POOL_LEFT_OPEN_TIME_ID = Symbol('POOL_LEFT_OPEN_TIME_ID');
//# sourceMappingURL=PoolLeftOpenTimeRenderer.js.map