"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerticalGridRenderer = void 0;
const _config_1 = __importDefault(require("../../../config.js"));
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const ui_1 = __importDefault(require("../../../lib/ui"));
const _rendering_1 = require("../../index.js");
class VerticalGridRenderer extends _rendering_1.BaseRenderer {
    constructor() {
        super(...arguments);
        this.lineStyle = {
            width: 1,
            color: 0xFFFFFF,
            alpha: 0.05,
        };
        this.textStyle = {
            fill: 0xB7BDD7,
            fontWeight: 400,
            fontFamily: 'Roboto',
            fontSize: _config_1.default.grid.time.fontsize,
        };
    }
    get rendererId() {
        return VerticalGridRenderer.VERTICAL_GRID_ID;
    }
    update(context, container) {
        const { width, height } = context.screen;
        const { timerange } = context.plotdata;
        const stepsize = context.game.schedule;
        const timesteps = datamath_1.default.steps(timerange, stepsize, _config_1.default.grid.time.max);
        const xs = datamath_1.default.scale(timesteps, timerange, width);
        const outsideX = -100;
        let idx = 0;
        // create a set lines and texts and reuse them
        // fix GL_OUT_OF_MEMORY
        while (idx++ < _config_1.default.grid.time.max * 2) {
            this.rebind(idx);
            const x = xs[idx] || outsideX;
            const time = timesteps[idx] || 0;
            const [line, lineState] = this.get('x_gridline', () => _rendering_1.GraphicUtils.createLine([0, 0], [0, height], this.lineStyle));
            if (lineState.new)
                container.addChild(line);
            line.position.set(x, 0);
            line.height = height;
            const time24 = ui_1.default.time24(time);
            const [text, textState] = this.get('x_gridtext', () => _rendering_1.GraphicUtils.createText(time24, [x, height], this.textStyle, 1.1));
            if (textState.new)
                container.addChild(text);
            text.position.set(x, height);
            text.text = time24;
        }
        return container;
    }
}
exports.VerticalGridRenderer = VerticalGridRenderer;
VerticalGridRenderer.VERTICAL_GRID_ID = Symbol('VERTICAL_GRID_ID');
//# sourceMappingURL=VerticalGridRenderer.js.map