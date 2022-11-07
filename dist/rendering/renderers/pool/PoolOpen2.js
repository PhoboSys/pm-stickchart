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
            width: 1,
            join: 'round',
            cap: 'round',
            gap: 10,
            dash: 10,
            color: 0xB7BDD7,
            alpha: 0.5,
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
        if (!this.isActualPool(pool))
            return this.clear();
        this.updatePositioningLine(pool, context, container);
    }
    updatePositioningLine(pool, context, container) {
        const { width, height } = context.screen;
        const { timerange } = context.plotdata;
        const [x] = datamath_1.default.scale([pool.openDate], timerange, width);
        const [title, titlestate] = this.get('title', () => this.createTitle());
        title.position.set(x - this.coverStyle.paddingRight, this.coverStyle.paddingTop);
        if (titlestate.new)
            container.addChild(title);
        const [line, linestate] = this.get('line', () => __1.GraphicUtils.createVerticalDashLine(0, [0, height], this.lineStyle));
        if (linestate.new)
            container.addChild(line);
        line.position.x = x;
        line.height = height;
    }
    createTitle() {
        const { paddingx, paddingy } = this.coverStyle;
        const text = new pixi_1.Text('Positioning', this.textStyle);
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
}
exports.PoolOpen = PoolOpen;
PoolOpen.POOL_OPEN_ID = Symbol('POOL_OPEN_ID');
//# sourceMappingURL=PoolOpen2.js.map