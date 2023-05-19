"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrosshairRenderer = void 0;
const _rendering_1 = require("../../index.js");
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const ui_1 = __importDefault(require("../../../lib/ui"));
const _constants_1 = require("../../../constants/index.js");
class CrosshairRenderer extends _rendering_1.BaseRenderer {
    constructor(storage) {
        super(storage);
        this.lineStyle = {
            width: 1,
            color: 0x009797,
            alpha: 0.6,
            join: 'round',
            cap: 'round',
            paddingRight: 10,
            paddingBottom: 5,
        };
        this.priceCoverStyle = {
            color: 0x009797,
            padding: [2.5, 5],
            anchor: [1.2, 0.5],
            radius: 30,
            textstyle: {
                fill: 0xFFFFFF,
                fontWeight: 600,
                fontFamily: 'Gilroy',
                fontSize: 13,
            },
        };
        this.timeCoverStyle = {
            color: 0x009797,
            padding: [2.5, 5],
            anchor: [.5, 1],
            radius: 30,
            textstyle: {
                fill: 0xFFFFFF,
                fontWeight: 600,
                fontFamily: 'Gilroy',
                fontSize: 13,
            },
        };
    }
    get rendererId() {
        return CrosshairRenderer.CROSSHAIR_ID;
    }
    update(context, container) {
        var _a, _b, _c, _d, _e;
        if (((_a = this._context) === null || _a === void 0 ? void 0 : _a.eventTarget) !== context.eventTarget) {
            const handlePointermoveEvent = (event) => this.updatePointer(container, event);
            const handlePointerleaveEvent = () => this.clear();
            this.handlePointermoveEvent = (_b = this.handlePointermoveEvent) !== null && _b !== void 0 ? _b : handlePointermoveEvent;
            this.handlePointerleaveEvent = (_c = this.handlePointerleaveEvent) !== null && _c !== void 0 ? _c : handlePointerleaveEvent;
            (_d = this._context) === null || _d === void 0 ? void 0 : _d.eventTarget.removeEventListener('pointermove', this.handlePointermoveEvent);
            (_e = this._context) === null || _e === void 0 ? void 0 : _e.eventTarget.removeEventListener('pointerleave', this.handlePointerleaveEvent);
            context.eventTarget.addEventListener('pointermove', this.handlePointermoveEvent);
            context.eventTarget.addEventListener('pointerleave', this.handlePointerleaveEvent);
        }
        this._context = context;
        this.updatePointer(container);
        return container;
    }
    updatePointer(container, event) {
        if (event)
            this._position = event.position;
        if (!this._position)
            return;
        this.updateVertical(container);
        this.updateHorizontal(container);
    }
    updateVertical(container) {
        const { width, height } = this._context.screen;
        const { timerange: [mintime, maxtime] } = this._context.plotdata;
        const { x } = this._position;
        const timedif = maxtime - mintime;
        const [timestamp] = datamath_1.default.scale([x], [0, width], timedif);
        const [coveredText, coveredTextState] = this.get('timeCoveredText', () => _rendering_1.GraphicUtils.createCoveredText(ui_1.default.time24(mintime + timestamp), [x, height], this.timeCoverStyle));
        if (coveredTextState.new)
            container.addChild(coveredText);
        else
            coveredText.update((textGraphic) => textGraphic.text = ui_1.default.time24(mintime + timestamp), [x, height], this.timeCoverStyle);
        const padding = coveredText.height + this.lineStyle.paddingBottom;
        const [horizontal, horizontalState] = this.get('vertical', () => _rendering_1.GraphicUtils.createLine([0, 0], [0, height], this.lineStyle));
        horizontal.position.set(x, 0);
        horizontal.height = height - padding;
        if (horizontalState.new)
            container.addChild(horizontal);
    }
    updateHorizontal(container) {
        const { width, height } = this._context.screen;
        const { pricerange: [minprice, maxprice] } = this._context.plotdata;
        const { y } = this._position;
        const pricedif = maxprice - minprice;
        const price = minprice + datamath_1.default.scaleReverse([y], [0, height], pricedif)[0];
        const [coveredText, coveredTextState] = this.get('priceCoveredText', () => _rendering_1.GraphicUtils.createCoveredText(ui_1.default.currency(price, _constants_1.USD), [width, y], this.priceCoverStyle));
        if (coveredTextState.new)
            container.addChild(coveredText);
        else
            coveredText.update((textGraphic) => textGraphic.text = ui_1.default.currency(price, _constants_1.USD), [width, y], this.priceCoverStyle);
        const padding = coveredText.width + this.lineStyle.paddingRight;
        const [horizontal, horizontalState] = this.get('horizontal', () => _rendering_1.GraphicUtils.createLine([0, 0], [width, 0], this.lineStyle));
        horizontal.position.set(0, y);
        horizontal.width = width - padding;
        if (horizontalState.new)
            container.addChild(horizontal);
    }
    clear(name) {
        if (!name)
            this._position = null;
        super.clear(name);
    }
}
exports.CrosshairRenderer = CrosshairRenderer;
CrosshairRenderer.CROSSHAIR_ID = Symbol('CROSSHAIR_ID');
//# sourceMappingURL=CrosshairRenderer.js.map