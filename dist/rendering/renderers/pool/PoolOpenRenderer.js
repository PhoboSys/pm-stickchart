"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolOpenRenderer = void 0;
const __1 = require("../..");
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
const index_1 = require("../../../lib/dispayquery/index");
class PoolOpenRenderer extends __1.BaseRenderer {
    constructor(renderer) {
        super(renderer);
        this.poolnameStyle = {
            default: {
                cover: {
                    paddingx: 10,
                    paddingy: 4,
                    paddingTop: 30,
                    paddingRight: 10,
                    radiuses: [8, 8, 2, 8],
                    color: 0xB7BDD7,
                },
                text: {
                    fontWeight: 600,
                    fontFamily: 'Gilroy',
                    fontSize: 12,
                    fill: 0x22273F,
                }
            },
            'width < 600': { display: false },
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
        this.updatePoolName(context, container);
        this.updateDashLine(context, container);
        return container;
    }
    updatePoolName(context, container) {
        const { width } = context.screen;
        const { timerange } = context.plotdata;
        const [x] = datamath_1.default.scale([context.pool.openDate], timerange, width);
        const style = index_1.DisplayQuery.apply(this.poolnameStyle, context.displayQuery);
        const [poolname, poolstate] = this.get('poolname', () => this.createPoolName(style), Object.values(style));
        const { paddingRight, paddingTop } = style.cover;
        poolname.position.set(x - paddingRight, paddingTop);
        if (poolstate.new)
            container.addChild(poolname);
    }
    updateDashLine(context, container) {
        const { width, height } = context.screen;
        const { timerange } = context.plotdata;
        const [x] = datamath_1.default.scale([context.pool.openDate], timerange, width);
        const [line, linestate] = this.get('dash', () => this.createDash(context));
        line.position.x = x;
        line.height = height;
        if (linestate.new)
            container.addChild(line);
    }
    createPoolName(style) {
        if (!style.display)
            return new pixi_1.Container;
        const { paddingx, paddingy } = style.cover;
        const text = new pixi_1.Text('Open', style.text);
        text.position.set(paddingx, paddingy);
        const width = text.width + paddingx * 2;
        const height = text.height + paddingy * 2;
        const { radiuses, color } = style.cover;
        const cover = __1.GraphicUtils.createRoundedRect([0, 0], [width, height], radiuses, { color });
        text.position.x = -width + paddingx;
        cover.position.x = -width;
        const poolname = new pixi_1.Container();
        poolname.addChild(cover, text);
        return poolname;
    }
    createDash(context) {
        const { height } = context.screen;
        const dash = __1.GraphicUtils.createVerticalDashLine(0, [0, height], this.lineStyle);
        return dash;
    }
}
exports.PoolOpenRenderer = PoolOpenRenderer;
PoolOpenRenderer.POOL_OPEN_ID = Symbol('POOL_OPEN_ID');
//# sourceMappingURL=PoolOpenRenderer.js.map