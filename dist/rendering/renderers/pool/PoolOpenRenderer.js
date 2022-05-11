"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolOpenRenderer = void 0;
const __1 = require("../..");
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
class PoolOpenRenderer extends __1.BaseRenderer {
    constructor(renderer) {
        super(renderer);
        this.coverStyle = {
            paddingx: 10,
            paddingy: 4,
            paddingTop: 30,
            paddingRight: 10,
            radius: 8,
            color: 0x22273F,
            lineStyle: {
                color: 0xB7BDD7,
                width: 2,
            }
        };
        this.textStyle = {
            fontWeight: 600,
            fontFamily: 'Gilroy',
            fontSize: 12,
            fill: 0xB7BDD7,
        };
        this.torusStyle = {
            innerr: 2.5,
            outerr: 5,
            paddingTop: 10,
            color: 0xB7BDD7,
        };
        this.lineStyle = {
            width: 2,
            join: 'round',
            cap: 'round',
            gap: 10,
            dash: 10,
            paddingTop: 5,
            paddingBottom: 30,
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
        const [cover, coverstate] = this.get('poolName', () => this.createPoolName());
        cover.position.set(x - this.coverStyle.paddingRight, this.coverStyle.paddingTop);
        const [torus, torusstate] = this.get('torus', () => this.createTorus());
        torus.position.set(x, cover.position.y + cover.height);
        const [line, linestate] = this.get('dash', () => this.createDash(context));
        line.position.set(x, torus.position.y + this.torusStyle.outerr);
        line.height = height - line.position.y - this.lineStyle.paddingBottom;
        if (coverstate.new)
            container.addChild(cover);
        if (torusstate.new)
            container.addChild(torus);
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
        const { radius, color } = this.coverStyle;
        const cover = new pixi_1.Graphics()
            .beginFill(color)
            .lineStyle(this.coverStyle.lineStyle)
            .drawRoundedRect(0, 0, width, height, radius)
            .endFill();
        text.position.x = -width + paddingx;
        cover.position.x = -width;
        const poolname = new pixi_1.Container();
        poolname.addChild(cover, text);
        return poolname;
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
exports.PoolOpenRenderer = PoolOpenRenderer;
PoolOpenRenderer.POOL_OPEN_ID = Symbol('POOL_OPEN_ID');
//# sourceMappingURL=PoolOpenRenderer.js.map