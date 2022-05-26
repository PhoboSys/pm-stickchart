"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolLockRenderer = void 0;
const __1 = require("../..");
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
const symbols_1 = require("../../textures/symbols");
class PoolLockRenderer extends __1.BaseRenderer {
    constructor(renderer) {
        super(renderer);
        this.coverStyle = {
            paddingx: 7,
            paddingy: 5,
            paddingTop: 30,
            paddingLeft: 10,
            radiuses: [8, 8, 8, 2],
            color: 0xFFA000,
        };
        this.iconStyle = {
            size: 13,
        };
        this.lineStyle = {
            width: 2,
            alpha: .8,
            join: 'round',
            cap: 'round',
            color: 0xFFA000,
            gap: 10,
            dash: 10,
        };
    }
    get rendererId() {
        return PoolLockRenderer.POOL_LOCK_ID;
    }
    update(context, container) {
        if (!context.pool) {
            container.alpha = 0;
            return container;
        }
        container.alpha = 1;
        this.updatePoolBorder(context, container);
        return container;
    }
    updatePoolBorder(context, container) {
        const { width, height } = context.screen;
        const { timerange } = context.plotdata;
        const [x] = datamath_1.default.scale([context.pool.lockDate], timerange, width);
        const [cover, coverstate] = this.get('icon', () => this.createPoolIcon(context));
        cover.position.set(x + this.coverStyle.paddingLeft, this.coverStyle.paddingTop);
        const [line, linestate] = this.get('dash', () => this.createDash(context));
        line.position.x = x;
        line.height = height;
        if (coverstate.new)
            container.addChild(cover);
        if (linestate.new)
            container.addChild(line);
        return container;
    }
    createPoolIcon(context) {
        const { paddingx, paddingy } = this.coverStyle;
        const lockIcon = new pixi_1.Sprite(context.textures.get(symbols_1.LOCK_ICON_TEXTURE));
        lockIcon.scale.set(this.iconStyle.size / lockIcon.height);
        lockIcon.position.set(paddingx, paddingy);
        const width = lockIcon.width + paddingx * 2;
        const height = lockIcon.height + paddingy * 2;
        const { radiuses, color } = this.coverStyle;
        const cover = __1.GraphicUtils.createRoundedRect([0, 0], [width, height], radiuses, { color });
        const lockPool = new pixi_1.Container();
        lockPool.addChild(cover, lockIcon);
        return lockPool;
    }
    createDash(context) {
        const { height } = context.screen;
        const dash = __1.GraphicUtils.createVerticalDashLine(0, [0, height], this.lineStyle);
        return dash;
    }
}
exports.PoolLockRenderer = PoolLockRenderer;
PoolLockRenderer.POOL_LOCK_ID = Symbol('POOL_LOCK_ID');
//# sourceMappingURL=PoolLockRenderer.js.map