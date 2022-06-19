"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolOpenRenderer = void 0;
const _rendering_1 = require("../../index.js");
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
class PoolOpenRenderer extends _rendering_1.BaseRenderer {
    constructor(renderer) {
        super(renderer);
        this.coverStyle = {
            paddingx: 10,
            paddingy: 4,
            paddingTop: 30,
            paddingRight: 10,
            radiuses: [8, 8, 2, 8],
            color: 0xB7BDD7,
        };
        this.textStyle = {
            fontWeight: 600,
            fontFamily: 'Gilroy',
            fontSize: 12,
            fill: 0x22273F,
        };
        this.lineStyle = {
            width: 2,
            join: 'round',
            cap: 'round',
            gap: 10,
            dash: 10,
            color: 0xB7BDD7,
        };
    }
    get rendererId() {
        return PoolOpenRenderer.POOL_OPEN_ID;
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
        const [x] = datamath_1.default.scale([context.pool.openDate], timerange, width);
        const [cover, coverstate] = this.get('cover', () => this.createPoolName());
        cover.position.set(x - this.coverStyle.paddingRight, this.coverStyle.paddingTop);
        const [line, linestate] = this.get('dash', () => this.createDash(context));
        line.position.x = x;
        line.height = height;
        if (coverstate.new)
            container.addChild(cover);
        if (linestate.new)
            container.addChild(line);
        return container;
    }
    createPoolName() {
        const { paddingx, paddingy } = this.coverStyle;
        const text = new pixi_1.Text('Open', this.textStyle);
        text.position.set(paddingx, paddingy);
        const width = text.width + paddingx * 2;
        const height = text.height + paddingy * 2;
        const { radiuses, color } = this.coverStyle;
        const cover = _rendering_1.GraphicUtils.createRoundedRect([0, 0], [width, height], radiuses, { color });
        text.position.x = -width + paddingx;
        cover.position.x = -width;
        const poolname = new pixi_1.Container();
        poolname.addChild(cover, text);
        return poolname;
    }
    createDash(context) {
        const { height } = context.screen;
        const dash = _rendering_1.GraphicUtils.createVerticalDashLine(0, [0, height], this.lineStyle);
        return dash;
    }
}
exports.PoolOpenRenderer = PoolOpenRenderer;
PoolOpenRenderer.POOL_OPEN_ID = Symbol('POOL_OPEN_ID');
//# sourceMappingURL=PoolOpenRenderer.js.map