"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolOpenBorderRenderer = void 0;
const __1 = require("../..");
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
class PoolOpenBorderRenderer extends __1.BaseRenderer {
    constructor(renderer) {
        super(renderer);
        this.coverStyle = {
            paddingx: 10,
            paddingy: 5,
            paddingTop: 30,
            paddingRight: 10,
            radius: 8,
            color: 0x22273F,
            lineStyle: {
                color: 0xFFFFFF,
                width: 2,
            }
        };
        this.textStyle = {
            fontWeight: 600,
            fontFamily: 'Gilroy',
            fontSize: 12,
            fill: 0xFFFFFF,
        };
        this.torusStyle = {
            innerr: 2.5,
            outerr: 5,
            paddingTop: 10,
            color: 0xFFFFFF,
        };
        this.lineStyle = {
            width: 2,
            alpha: 0.7,
            join: 'round',
            cap: 'round',
            gap: 10,
            dash: 10,
            paddingTop: 5,
            paddingBottom: 20,
            color: 0xFFFFFF,
        };
    }
    get rendererId() {
        return PoolOpenBorderRenderer.POOL_OPEN_BORDER_ID;
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
        if (coverstate.new) {
            cover.position.y = this.coverStyle.paddingTop;
            container.addChild(cover);
        }
        cover.position.x = x - this.coverStyle.paddingRight;
        const [torus, torusstate] = this.get('torus', () => this.createTorus());
        if (torusstate.new) {
            torus.position.y = cover.position.y + cover.height;
            container.addChild(torus);
        }
        torus.position.x = x;
        const [line, linestate] = this.get('dash', () => this.createDash(context));
        if (linestate.new) {
            line.position.y += torus.position.y + this.torusStyle.outerr;
            container.addChild(line);
        }
        line.height = height - line.position.y - this.lineStyle.paddingBottom;
        line.position.x = x;
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
        const poolname = new pixi_1.Graphics();
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
exports.PoolOpenBorderRenderer = PoolOpenBorderRenderer;
PoolOpenBorderRenderer.POOL_OPEN_BORDER_ID = Symbol('POOL_OPEN_BORDER_ID');
//# sourceMappingURL=PoolOpenBorderRenderer.js.map