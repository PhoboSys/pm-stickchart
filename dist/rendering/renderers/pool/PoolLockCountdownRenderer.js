"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolLockCountdownRenderer = void 0;
const __1 = require("../..");
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
const symbols_1 = require("../../textures/symbols");
class PoolLockCountdownRenderer extends __1.BaseRenderer {
    constructor(renderer) {
        super(renderer);
        this.style = {
            alpha: .2,
        };
    }
    get rendererId() {
        return PoolLockCountdownRenderer.POOL_LOCK_COUNTDOWN_ID;
    }
    hideContainer(container) {
        container.alpha = 0;
        return container;
    }
    update(context, container) {
        if (!context.pool)
            return this.hideContainer(container);
        const { width, height, } = context.screen;
        const { lockDate, openDate } = context.pool;
        const { timerange, xs } = context.plotdata;
        const [ox, rightx] = datamath_1.default.scale([openDate, lockDate], timerange, width);
        const leftx = Math.max(Number(xs.at(-1)), ox);
        if (leftx > rightx)
            return this.hideContainer(container);
        const shape = [
            0, 0,
            rightx - leftx, 0,
            rightx - leftx, height,
            0, height,
        ];
        const [gradient, gradientState] = this.get('gradient', () => new pixi_1.Graphics()
            .beginTextureFill({
            texture: context.textures.get(symbols_1.LOCK_COUNTDOWN_TEXTURE),
        })
            .drawPolygon(shape)
            .closePath()
            .endFill());
        gradient.position.x = leftx;
        gradient.width = rightx - leftx;
        gradient.height = height;
        if (gradientState.new)
            container.addChild(gradient);
        container.alpha = this.style.alpha;
        return container;
    }
}
exports.PoolLockCountdownRenderer = PoolLockCountdownRenderer;
PoolLockCountdownRenderer.POOL_LOCK_COUNTDOWN_ID = Symbol('POOL_LOCK_COUNTDOWN_ID');
//# sourceMappingURL=PoolLockCountdownRenderer.js.map