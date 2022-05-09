"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerticalGridRenderer = void 0;
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const config_1 = __importDefault(require("../../../config"));
const __1 = require("../..");
const DateUtils_1 = require("../../utils/DateUtils");
class VerticalGridRenderer extends __1.BaseRenderer {
    constructor(renderer) {
        super(renderer);
        this.lineStyle = {
            width: 1,
            color: 0x303550,
            alpha: 1,
        };
        this.textStyle = {
            fill: 0xB7BDD7,
            fontWeight: 500,
            fontFamily: 'Gilroy',
            fontSize: config_1.default.grid.time.fontsize,
        };
    }
    get rendererId() {
        return VerticalGridRenderer.VERTICAL_GRID_ID;
    }
    update(context, container) {
        const { width, height } = context.screen;
        const { timerange } = context.plotdata;
        const stepsize = context.pool.duration;
        const timesteps = datamath_1.default.steps(timerange, stepsize, config_1.default.grid.time.max);
        const xs = datamath_1.default.scale(timesteps, timerange, width);
        const outsideX = -100;
        let idx = 0;
        // create a set lines and texts and reuse them
        // fix GL_OUT_OF_MEMORY
        while (idx++ < config_1.default.grid.time.max * 2) {
            const x = xs[idx] || outsideX;
            const time = timesteps[idx] || 0;
            const [line, lineState] = this.get('x_gridline' + idx, () => __1.GraphicUtils.createLine([0, 0], [0, height], this.lineStyle));
            if (lineState.new)
                container.addChild(line);
            line.position.set(x, 0);
            const [text, textState] = this.get('x_gridtext' + idx, () => __1.GraphicUtils.createText(DateUtils_1.DateUtils.formatUnixTSToHHmm(time), [x, height], this.textStyle, 1.1));
            if (textState.new)
                container.addChild(text);
            text.position.set(x, height);
            text.text = DateUtils_1.DateUtils.formatUnixTSToHHmm(time);
        }
        return container;
    }
}
exports.VerticalGridRenderer = VerticalGridRenderer;
VerticalGridRenderer.VERTICAL_GRID_ID = Symbol('VERTICAL_GRID_ID');
//# sourceMappingURL=VerticalGridRenderer.js.map