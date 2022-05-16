"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrosshairRenderer = void 0;
const __1 = require("..");
const datamath_1 = __importDefault(require("../../lib/datamath"));
class CrosshairRenderer extends __1.BaseRenderer {
    constructor(storage) {
        super(storage);
        this.lineStyle = {
            width: 1,
            color: 0x009797,
            alpha: 0.6,
            join: 'round',
            cap: 'round',
            paddingright: 5,
        };
        this.priceCoverStyle = {
            color: 0x009797,
            paddingx: 5,
            paddingy: 2.5,
            anchorx: 1,
            anchory: 0.5,
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
        return container;
    }
    updatePointer(container, mouseEvent) {
        const { width, height } = this._context.screen;
        const { pricerange: [minprice, maxprice] } = this._context.plotdata;
        const { x, y } = mouseEvent.position;
        const [vertical, verticalState] = this.get('vertical', () => __1.GraphicUtils.createLine([0, 0], [0, height], this.lineStyle));
        vertical.position.set(x, 0);
        vertical.height = height;
        const pricedif = maxprice - minprice;
        const price = maxprice - datamath_1.default.scale([y], [0, height], pricedif)[0];
        const [coveredText, coveredTextState] = this.get('coveredText', () => __1.GraphicUtils.createCoveredText(datamath_1.default.toFixedPrecision(price, 8), [width, y], this.priceCoverStyle));
        const textGraphic = coveredText.getChildAt(1);
        textGraphic.text = `$${datamath_1.default.toFixedPrecision(price, 8)}`;
        const { paddingx, paddingy } = this.priceCoverStyle;
        const coverGraphic = coveredText.getChildAt(0);
        coverGraphic.width = textGraphic.width + paddingx * 2;
        coverGraphic.height = textGraphic.height + paddingy * 2;
        const { anchorx, anchory } = this.priceCoverStyle;
        coveredText.position.set(width - coveredText.width * anchorx, y - coveredText.height * anchory);
        const padding = coveredText.width + this.lineStyle.paddingright;
        const [horizontal, horizontalState] = this.get('horizontal', () => __1.GraphicUtils.createLine([0, 0], [width, 0], this.lineStyle));
        horizontal.position.set(0, y);
        horizontal.width = width - padding;
        if (horizontalState.new)
            container.addChild(horizontal);
        if (verticalState.new)
            container.addChild(vertical);
        if (coveredTextState.new)
            container.addChild(coveredText);
    }
}
exports.CrosshairRenderer = CrosshairRenderer;
CrosshairRenderer.CROSSHAIR_ID = Symbol('CROSSHAIR_ID');
//# sourceMappingURL=CrosshairRenderer.js.map