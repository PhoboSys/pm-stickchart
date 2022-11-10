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
        this.openBorder = {
            lineStyle: {
                width: 2,
                color: 0xB7BDD7,
                alpha: 1,
            },
            textStyle: {
                fontWeight: 600,
                fontFamily: 'Gilroy',
                fontSize: 12,
                fill: 0x22273F,
            },
            coverStyle: {
                paddingx: 10,
                paddingy: 4,
                paddingTop: 10,
                paddingRight: 10,
                radiuses: [8, 8, 2, 8],
                color: 0xB7BDD7,
            },
        };
    }
    get rendererId() {
        return PoolOpen.POOL_OPEN_ID;
    }
    updatePool(pool, context, container) {
        if (this.isHistoricalPool(pool, context))
            return this.clear();
        this.updateOpenLine(pool, context, container);
    }
    updateOpenLine(pool, context, container) {
        const { width, height } = context.screen;
        const { timerange } = context.plotdata;
        const [x] = datamath_1.default.scale([pool.openPriceTimestamp], timerange, width);
        const style = this.openBorder;
        const [title, titlestate] = this.get('title', () => this.createTitle('Open', style));
        title.position.set(x - style.coverStyle.paddingRight, style.coverStyle.paddingTop);
        if (titlestate.new)
            container.addChild(title);
        const [line, linestate] = this.get('line', () => (new pixi_1.Graphics())
            .lineStyle(style.lineStyle)
            .moveTo(0, 0)
            .lineTo(0, height));
        if (linestate.new)
            container.addChild(line);
        line.position.x = x;
        line.height = height;
    }
    createTitle(title, style) {
        const { paddingx, paddingy } = style.coverStyle;
        const text = __1.GraphicUtils.createText(title, [paddingx, paddingy], style.textStyle);
        const width = text.width + paddingx * 2;
        const height = text.height + paddingy * 2;
        const { radiuses, color } = style.coverStyle;
        const cover = __1.GraphicUtils.createRoundedRect([0, 0], [width, height], radiuses, { color });
        text.position.x = -width + paddingx;
        cover.position.x = -width;
        const group = new pixi_1.Container();
        group.addChild(cover, text);
        return group;
    }
}
exports.PoolOpen = PoolOpen;
PoolOpen.POOL_OPEN_ID = Symbol('POOL_OPEN_ID');
//# sourceMappingURL=PoolOpen.js.map