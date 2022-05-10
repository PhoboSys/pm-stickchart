"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrosshairRenderer = void 0;
const __1 = require("..");
const datamath_1 = __importDefault(require("../../lib/datamath"));
const pixi_1 = require("../../lib/pixi");
class CrosshairRenderer extends __1.BaseRenderer {
    constructor(storage) {
        super(storage);
        this.lineStyle = {
            width: 2,
            color: 0x009797,
            alpha: 1,
            join: 'round',
            cap: 'round',
        };
        this.priceCoverStyle = {
            color: 0x009797,
            paddingright: 5,
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
        var _a, _b, _c;
        if (((_a = this._context) === null || _a === void 0 ? void 0 : _a.eventTarget) !== context.eventTarget) {
            const handlePointermoveEvent = (event) => this.updatePointer(container, event);
            const handlePointerleaveEvent = () => this.clear();
            this.handlePointermoveEvent = (_b = this.handlePointermoveEvent) !== null && _b !== void 0 ? _b : handlePointermoveEvent;
            this.handlePointerleaveEvent = (_c = this.handlePointerleaveEvent) !== null && _c !== void 0 ? _c : handlePointerleaveEvent;
            context.eventTarget.removeEventListener('pointermove', this.handlePointermoveEvent);
            context.eventTarget.removeEventListener('pointerleave', this.handlePointerleaveEvent);
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
        const [vertical, verticalstate] = this.get('vertical', () => new pixi_1.Graphics());
        if (verticalstate.new)
            container.addChild(vertical);
        vertical
            .clear()
            .lineStyle(this.lineStyle)
            .moveTo(x, 0)
            .lineTo(x, height);
        const pricedif = maxprice - minprice;
        const price = maxprice - datamath_1.default.scale([y], [0, height], pricedif)[0];
        const { paddingright } = this.priceCoverStyle;
        const priceText = __1.GraphicUtils.createCoveredText(price.toFixed(3), [width - paddingright, y], this.priceCoverStyle);
        const horizontalLine = __1.GraphicUtils.createLine([0, y], [priceText.x, y], this.lineStyle);
        const [horizontal, horizontalstate] = this.get('horizontal', () => new pixi_1.Graphics());
        if (horizontalstate.new)
            container.addChild(horizontal);
        else
            horizontal.removeChildren().forEach(e => e.destroy());
        horizontal.addChild(horizontalLine, priceText);
    }
}
exports.CrosshairRenderer = CrosshairRenderer;
CrosshairRenderer.CROSSHAIR_ID = Symbol('CROSSHAIR_ID');
//# sourceMappingURL=CrosshairRenderer.js.map