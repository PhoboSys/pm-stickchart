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
            radius: 8,
            color: 0xFFA000,
        };
        this.iconStyle = {
            size: 13,
        };
        this.torusStyle = {
            innerr: 2.5,
            outerr: 5,
            paddingTop: 10,
            color: 0xFFA000,
        };
        this.lineStyle = {
            width: 2,
            join: 'round',
            cap: 'round',
            gap: 10,
            dash: 10,
            paddingTop: 5,
            paddingBottom: 20,
            color: 0xFFA000,
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
        const [torus, torusstate] = this.get('torus', () => this.createTorus());
        torus.position.set(x, cover.position.y + cover.height);
        const [line, linestate] = this.get('dash', () => this.createDash(context));
        line.height = height - line.position.y - this.lineStyle.paddingBottom;
        line.position.set(x, torus.position.y + this.torusStyle.outerr);
        if (coverstate.new)
            container.addChild(cover);
        if (torusstate.new)
            container.addChild(torus);
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
        const { radius, color } = this.coverStyle;
        const cover = new pixi_1.Graphics()
            .beginFill(color)
            .lineStyle(this.coverStyle.lineStyle)
            .drawRoundedRect(0, 0, width, height, radius)
            .endFill();
        const lockPool = new pixi_1.Container();
        lockPool.addChild(cover, lockIcon);
        return lockPool;
    }
    createTorus() {
        const { innerr, outerr, color } = this.torusStyle;
        const torus = new pixi_1.Graphics()
            .beginFill(color)
            .drawTorus(0, 0, innerr, outerr)
            .endFill();
        return torus;
    }
    createDash(context) {
        const { height } = context.screen;
        const { paddingBottom, paddingTop } = this.lineStyle;
        const dash = __1.GraphicUtils.createVerticalDashLine(0, [0, height - paddingBottom], this.lineStyle);
        dash.position.y = paddingTop;
        return dash;
    }
}
exports.PoolLockRenderer = PoolLockRenderer;
PoolLockRenderer.POOL_LOCK_ID = Symbol('POOL_LOCK_ID');
//# sourceMappingURL=PoolLockRenderer.js.map