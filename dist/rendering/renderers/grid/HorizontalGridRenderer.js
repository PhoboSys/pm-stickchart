"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HorizontalGridRenderer = void 0;
const _constants_1 = require("../../../constants/index.js");
const _config_1 = __importDefault(require("../../../config.js"));
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const index_1 = __importDefault(require("../../../lib/ui/index"));
const _rendering_1 = require("../../index.js");
class HorizontalGridRenderer extends _rendering_1.BaseRenderer {
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
            fontSize: _config_1.default.grid.price.fontsize,
        };
    }
    get rendererId() {
        return HorizontalGridRenderer.HORIZONTAL_GRID_ID;
    }
    update(context, container) {
        const { width, height } = context.screen;
        const { pricerange } = context.plotdata;
        const stepsize = datamath_1.default.datastep(pricerange);
        const pricesteps = datamath_1.default.steps(pricerange, stepsize, _config_1.default.grid.price.max);
        const ys = datamath_1.default.scaleReverse(pricesteps, pricerange, height);
        const outsideY = -100;
        let idx = 0;
        // create a set lines and texts and reuse them
        // fix GL_OUT_OF_MEMORY
        while (idx++ < _config_1.default.grid.price.max * 2) {
            let y = ys[idx] || outsideY;
            const price = pricesteps[idx] || 0;
            // Avoid rendering over time axe text
            // size + anchor=1.1
            const timeHeight = _config_1.default.grid.time.fontsize + _config_1.default.grid.time.fontsize * 1.1;
            if (y > (height - timeHeight))
                y = outsideY;
            const [line, lineState] = this.get('y_gridline' + idx, () => _rendering_1.GraphicUtils.createLine([0, 0], [width, 0], this.lineStyle));
            if (lineState.new)
                container.addChild(line);
            line.position.set(0, y);
            line.width = width;
            const priceValue = index_1.default.currencyScaled(price, _constants_1.USD, stepsize);
            const [text, textState] = this.get('y_gridtext' + idx, () => _rendering_1.GraphicUtils.createText(priceValue, [width, y], this.textStyle, [1.3, 1.1]));
            if (textState.new)
                container.addChild(text);
            text.position.set(width, y);
            text.text = priceValue;
        }
        return container;
    }
}
exports.HorizontalGridRenderer = HorizontalGridRenderer;
HorizontalGridRenderer.HORIZONTAL_GRID_ID = Symbol('HORIZONTAL_GRID_ID');
//# sourceMappingURL=HorizontalGridRenderer.js.map