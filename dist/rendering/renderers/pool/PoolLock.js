"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolLock = void 0;
const _rendering_1 = require("../../index.js");
const symbols_1 = require("../../textures/symbols");
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
const BasePoolsRenderer_1 = require("./BasePoolsRenderer");
class PoolLock extends BasePoolsRenderer_1.BasePoolsRenderer {
    constructor() {
        super(...arguments);
        this.actualLineStyle = {
            width: 2,
            alpha: .8,
            join: 'round',
            cap: 'round',
            color: 0xFFA000,
            gap: 10,
            dash: 10,
        };
        this.actualIconStyle = {
            size: 13,
        };
        this.actualCoverStyle = {
            paddingx: 7,
            paddingy: 5,
            paddingTop: 10,
            paddingLeft: 10,
            radiuses: [8, 8, 8, 2],
            color: 0xFFA000,
        };
    }
    get rendererId() {
        return PoolLock.POOL_LOCK_ID;
    }
    updatePool(pool, context, container) {
        if (!this.isActualPool(pool))
            return this.clear();
        this.updateActualPool(pool, context, container);
    }
    updateActualPool(pool, context, container) {
        const { width, height } = context.screen;
        const { timerange } = context.plotdata;
        const [x] = datamath_1.default.scale([pool.lockDate], timerange, width);
        const [title, titlestate] = this.get('title', () => this.createActualPoolTitle(context));
        title.position.set(x + this.actualCoverStyle.paddingLeft, this.actualCoverStyle.paddingTop);
        if (titlestate.new)
            container.addChild(title);
        const [line, linestate] = this.get('line', () => this.createActualPoolLine(context));
        line.position.x = x;
        line.height = height;
        if (linestate.new)
            container.addChild(line);
    }
    createActualPoolTitle(context) {
        const { paddingx, paddingy } = this.actualCoverStyle;
        const lockIcon = new pixi_1.Sprite(context.textures.get(symbols_1.LOCK_ICON_TEXTURE));
        lockIcon.scale.set(this.actualIconStyle.size / lockIcon.height);
        lockIcon.position.set(paddingx, paddingy);
        const width = lockIcon.width + paddingx * 2;
        const height = lockIcon.height + paddingy * 2;
        const { radiuses, color } = this.actualCoverStyle;
        const cover = _rendering_1.GraphicUtils.createRoundedRect([0, 0], [width, height], radiuses, { color });
        const lockPool = new pixi_1.Container();
        lockPool.addChild(cover, lockIcon);
        return lockPool;
    }
    createActualPoolLine(context) {
        const { height } = context.screen;
        const dash = _rendering_1.GraphicUtils.createVerticalDashLine(0, [0, height], this.actualLineStyle);
        return dash;
    }
}
exports.PoolLock = PoolLock;
PoolLock.POOL_LOCK_ID = Symbol('POOL_LOCK_ID');
//# sourceMappingURL=PoolLock.js.map