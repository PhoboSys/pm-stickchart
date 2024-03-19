"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PariLine = void 0;
const merge_1 = __importDefault(require("lodash/merge"));
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
const _enums_1 = require("../../../enums/index.js");
const GroupComponent_1 = require("../../components/GroupComponent");
const BaseParisRenderer_1 = require("./BaseParisRenderer");
class PariLine extends BaseParisRenderer_1.BaseParisRenderer {
    constructor() {
        super(...arguments);
        this.baseLineStyle = {
            [_enums_1.EPosition.Up]: {
                startOffset: [0, -8],
                endOffset: [0, 40 + (58 - 32) / 2 + 32],
                lineStyle: {
                    width: 2,
                }
            },
            [_enums_1.EPosition.Down]: {
                startOffset: [0, 8],
                endOffset: [0, -134 - 62 + (58 - 32) / 2],
                lineStyle: {
                    width: 2,
                }
            },
            [_enums_1.EPosition.Zero]: {
                startOffset: [0, 8],
                endOffset: [0, 14 + (58 - 32) / 2],
                lineStyle: {
                    width: 2,
                }
            }
        };
        this.orphanlineStyle = (0, merge_1.default)({}, this.baseLineStyle, {
            [_enums_1.EPosition.Up]: { lineStyle: { color: 0xD32F2F } },
            [_enums_1.EPosition.Down]: { lineStyle: { color: 0xD32F2F } },
            [_enums_1.EPosition.Zero]: { lineStyle: { color: 0xD32F2F } }
        });
        this.nocontestLineStyle = (0, merge_1.default)({}, this.baseLineStyle, {
            [_enums_1.EPosition.Up]: { lineStyle: { color: 0xFFFFFF } },
            [_enums_1.EPosition.Down]: { lineStyle: { color: 0xFFFFFF } },
            [_enums_1.EPosition.Zero]: { lineStyle: { color: 0xFFFFFF } }
        });
        this.winlineStyle = (0, merge_1.default)({}, this.baseLineStyle, {
            [_enums_1.EPosition.Up]: { lineStyle: { color: 0xF7C15B } },
            [_enums_1.EPosition.Down]: { lineStyle: { color: 0xF7C15B } },
            [_enums_1.EPosition.Zero]: { lineStyle: { color: 0xF7C15B } }
        });
        this.validPariPositions = {
            [_enums_1.EPosition.Up]: _enums_1.EPosition.Up,
            [_enums_1.EPosition.Down]: _enums_1.EPosition.Down,
            [_enums_1.EPosition.Zero]: _enums_1.EPosition.Zero,
        };
    }
    get rendererId() {
        return PariLine.PARI_LINE_ID;
    }
    updatePari(pool, pari, context, container) {
        if (!(pari.position in this.validPariPositions))
            return this.clear();
        if (!pool.openPriceTimestamp || !pool.openPriceValue)
            return this.clear();
        const state = this.getPariState(pool, pari, context);
        if (!state.win && !state.nocontest && state.isHistorical)
            return this.clear();
        const [groupElement] = this.get('groupElement', () => new GroupComponent_1.GroupComponent());
        const [group, groupstate] = groupElement.update(context, { poolid: pool.poolid, pariState: state });
        if (group && groupstate.new)
            container.addChild(group);
        this.updateLine(pool, pari, context, group, state);
    }
    updateLine(pool, pari, context, container, state) {
        const position = pari.position;
        const { win, orphan } = state;
        if (!container)
            return this.clear('line');
        const { height } = context.screen;
        const { pricerange } = context.plotdata;
        const { openPriceValue, openPriceTimestamp } = pool;
        const [ox] = datamath_1.default.scale([openPriceTimestamp], context.plotdata.timerange, context.screen.width);
        const [oy] = datamath_1.default.scaleReverse([openPriceValue], pricerange, height);
        const [line, linestate] = this.get('line', () => new pixi_1.Graphics());
        if (linestate.new)
            container.addChild(line);
        let style = this.nocontestLineStyle;
        if (orphan)
            style = this.orphanlineStyle;
        else if (win)
            style = this.winlineStyle;
        const [startx, starty] = style[pari.position].startOffset;
        const [endx, endy] = style[pari.position].endOffset;
        let vertical = null;
        if (position === _enums_1.EPosition.Up)
            vertical = 0;
        if (position === _enums_1.EPosition.Zero)
            vertical = oy;
        if (position === _enums_1.EPosition.Down)
            vertical = context.screen.height;
        line
            .clear()
            .lineStyle(style[pari.position].lineStyle)
            .moveTo(ox + startx, oy + starty)
            .lineTo(ox + endx, vertical + endy);
        line.position.y = -container.position.y;
    }
}
exports.PariLine = PariLine;
PariLine.PARI_LINE_ID = Symbol('PARI_LINE_ID');
//# sourceMappingURL=PariLine.js.map