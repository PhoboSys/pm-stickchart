"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HorizontalGridRenderer = void 0;
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const config_1 = __importDefault(require("../../../config"));
const __1 = require("../..");
const index_1 = __importDefault(require("../../../lib/ui/index"));
const currencies_1 = require("../../../constants/currencies");
class HorizontalGridRenderer extends __1.BaseRenderer {
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
            fontSize: config_1.default.grid.price.fontsize,
        };
    }
    get rendererId() {
        return HorizontalGridRenderer.HORIZONTAL_GRID_ID;
    }
    update(context, container) {
        const { width, height } = context.screen;
        const { pricerange } = context.plotdata;
        const stepsize = datamath_1.default.datastep(pricerange);
        const pricesteps = datamath_1.default.steps(pricerange, stepsize, config_1.default.grid.price.max);
        const ys = datamath_1.default.scaleReverse(pricesteps, pricerange, height);
        const outsideY = -100;
        let idx = 0;
        // create a set lines and texts and reuse them
        // fix GL_OUT_OF_MEMORY
        while (idx++ < config_1.default.grid.price.max * 2) {
            let y = ys[idx] || outsideY;
            const price = pricesteps[idx] || 0;
            // Avoid rendering over time axe text
            // size + anchor=1.1
            const timeHeight = config_1.default.grid.time.fontsize + config_1.default.grid.time.fontsize * 1.1;
            if (y > (height - timeHeight))
                y = outsideY;
            const [line, lineState] = this.get('y_gridline' + idx, () => __1.GraphicUtils.createLine([0, 0], [width, 0], this.lineStyle));
            if (lineState.new)
                container.addChild(line);
            line.position.set(0, y);
            line.width = width;
            const [text, textState] = this.get('y_gridtext' + idx, () => __1.GraphicUtils.createText(datamath_1.default.toFixedScaled(price, stepsize), [width, y], this.textStyle, 1.1));
            if (textState.new)
                container.addChild(text);
            text.position.set(width, y);
            text.text = index_1.default.currency(price, currencies_1.USD);
        }
        return container;
    }
}
exports.HorizontalGridRenderer = HorizontalGridRenderer;
HorizontalGridRenderer.HORIZONTAL_GRID_ID = Symbol('HORIZONTAL_GRID_ID');
//# sourceMappingURL=HorizontalGridRenderer.js.map