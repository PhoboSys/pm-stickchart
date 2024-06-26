"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredictionLine = void 0;
const merge_1 = __importDefault(require("lodash/merge"));
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
const _enums_1 = require("../../../enums/index.js");
const GroupComponent_1 = require("../../components/GroupComponent");
const BasePredictionsRenderer_1 = require("./BasePredictionsRenderer");
class PredictionLine extends BasePredictionsRenderer_1.BasePredictionsRenderer {
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
        this.validPredictionPositions = {
            [_enums_1.EPosition.Up]: _enums_1.EPosition.Up,
            [_enums_1.EPosition.Down]: _enums_1.EPosition.Down,
            [_enums_1.EPosition.Zero]: _enums_1.EPosition.Zero,
        };
    }
    get rendererId() {
        return PredictionLine.PREDICTION_LINE_ID;
    }
    updatePrediction(round, prediction, context, container) {
        if (!(prediction.position in this.validPredictionPositions))
            return this.clear();
        if (!round.openPriceTimestamp || !round.openPriceValue)
            return this.clear();
        const state = this.getPredictionState(round, prediction, context);
        if (!state.win && !state.nocontest && state.isHistorical)
            return this.clear();
        const [groupElement] = this.get('groupElement', () => new GroupComponent_1.GroupComponent());
        const [group, groupstate] = groupElement.update(context, { roundid: round.roundid, predictionState: state });
        if (group && groupstate.new)
            container.addChild(group);
        this.updateLine(round, prediction, context, group, state);
    }
    updateLine(round, prediction, context, container, state) {
        const position = prediction.position;
        const { win, orphan } = state;
        if (!container)
            return this.clear('line');
        const { height } = context.screen;
        const { pricerange } = context.plotdata;
        const { openPriceValue, openPriceTimestamp } = round;
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
        const [startx, starty] = style[prediction.position].startOffset;
        const [endx, endy] = style[prediction.position].endOffset;
        let vertical = null;
        if (position === _enums_1.EPosition.Up)
            vertical = 0;
        if (position === _enums_1.EPosition.Zero)
            vertical = oy;
        if (position === _enums_1.EPosition.Down)
            vertical = context.screen.height;
        line
            .clear()
            .lineStyle(style[prediction.position].lineStyle)
            .moveTo(ox + startx, oy + starty)
            .lineTo(ox + endx, vertical + endy);
        line.position.y = -container.position.y;
    }
}
exports.PredictionLine = PredictionLine;
PredictionLine.PREDICTION_LINE_ID = Symbol('PREDICTION_LINE_ID');
//# sourceMappingURL=PredictionLine.js.map