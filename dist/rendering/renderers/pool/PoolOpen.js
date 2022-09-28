"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolOpen = void 0;
const __1 = require("../..");
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
const BasePoolsRenderer_1 = require("./BasePoolsRenderer");
class PoolOpen extends BasePoolsRenderer_1.BasePoolsRenderer {
    constructor() {
        super(...arguments);
        this.historicalLineStyle = {
            color: 0xFFFFFF,
            width: 2,
            alpha: 0,
        };
        this.lineStyle = {
            width: 2,
            join: 'round',
            cap: 'round',
            gap: 10,
            dash: 10,
            color: 0xB7BDD7,
        };
        this.textStyle = {
            fontWeight: 600,
            fontFamily: 'Gilroy',
            fontSize: 12,
            fill: 0x22273F,
        };
        this.coverStyle = {
            paddingx: 10,
            paddingy: 4,
            paddingTop: 30,
            paddingRight: 10,
            radiuses: [8, 8, 2, 8],
            color: 0xB7BDD7,
        };
    }
    get rendererId() {
        return PoolOpen.POOL_OPEN_ID;
    }
    updatePool(pool, context, container) {
        if (this.isActualPool(pool)) {
            this.clearHistoricalPool();
            this.updateActualPool(pool, context, container);
        }
        else {
            this.clearActualPool();
            this.updateHistoricalPool(pool, context, container);
        }
    }
    clearActualPool() {
        this.clear('actualtitle');
        this.clear('actualline');
    }
    clearHistoricalPool() {
        this.clear('historicalline');
    }
    updateActualPool(pool, context, container) {
        const { width, height } = context.screen;
        const { timerange } = context.plotdata;
        const [x] = datamath_1.default.scale([pool.openDate], timerange, width);
        const [title, titlestate] = this.get('actualtitle', () => this.createTitle());
        title.position.set(x - this.coverStyle.paddingRight, this.coverStyle.paddingTop);
        if (titlestate.new)
            container.addChild(title);
        const [line, linestate] = this.get('actualline', () => this.createLine(context));
        line.position.x = x;
        line.height = height;
        if (linestate.new)
            container.addChild(line);
    }
    createTitle() {
        const { paddingx, paddingy } = this.coverStyle;
        const text = new pixi_1.Text('Open', this.textStyle);
        text.position.set(paddingx, paddingy);
        const width = text.width + paddingx * 2;
        const height = text.height + paddingy * 2;
        const { radiuses, color } = this.coverStyle;
        const cover = __1.GraphicUtils.createRoundedRect([0, 0], [width, height], radiuses, { color });
        text.position.x = -width + paddingx;
        cover.position.x = -width;
        const title = new pixi_1.Container();
        title.addChild(cover, text);
        return title;
    }
    createLine(context) {
        const { height } = context.screen;
        const dash = __1.GraphicUtils.createVerticalDashLine(0, [0, height], this.lineStyle);
        return dash;
    }
    updateHistoricalPool(pool, context, container) {
        const { width, height } = context.screen;
        const { timerange } = context.plotdata;
        const [x] = datamath_1.default.scale([pool.openDate], timerange, width);
        const [line, linestate] = this.get('historicalline', () => this.createHistoricalPoolLine(context));
        if (linestate.new)
            container.addChild(line);
        line.position.x = x + this.historicalLineStyle.width;
        line.height = height;
    }
    createHistoricalPoolLine(context) {
        const { height } = context.screen;
        const line = __1.GraphicUtils.createLine([0, 0], [0, height], this.historicalLineStyle);
        return line;
    }
}
exports.PoolOpen = PoolOpen;
PoolOpen.POOL_OPEN_ID = Symbol('POOL_OPEN_ID');
//# sourceMappingURL=PoolOpen.js.map