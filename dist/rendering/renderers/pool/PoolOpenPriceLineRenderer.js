"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolOpenPriceLineRenderer = void 0;
const _rendering_1 = require("../../index.js");
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
const index_1 = __importDefault(require("../../../lib/ui/index"));
const _constants_1 = require("../../../constants/index.js");
class PoolOpenPriceLineRenderer extends _rendering_1.BaseRenderer {
    constructor(renderer) {
        super(renderer);
        this.coverStyle = {
            paddingx: 8,
            paddingy: 5,
            paddingRight: 10,
            radius: 30,
            color: 0x22273F,
            lineStyle: {
                color: 0xB7BDD7,
                width: 2,
            }
        };
        this.textStyle = {
            fill: 0xB7BDD7,
            fontWeight: 600,
            fontFamily: 'Gilroy',
            fontSize: 13,
        };
        this.torusStyle = {
            innerr: 3,
            outerr: 6,
            innerColor: 0x303550,
            outerColor: 0xB7BDD7,
        };
        this.lineStyle = {
            color: 0xB7BDD7,
            width: 1,
            alpha: 0.7,
        };
    }
    get rendererId() {
        return PoolOpenPriceLineRenderer.POOL_OPEN_PRICE_LINE_ID;
    }
    update(context, container) {
        var _a;
        if (!((_a = context === null || context === void 0 ? void 0 : context.pool) === null || _a === void 0 ? void 0 : _a.openPrice)) {
            container.alpha = 0;
            return container;
        }
        container.alpha = 1;
        this.updatePriceLine(context, container);
        return container;
    }
    updatePriceLine(context, container) {
        const { timerange, pricerange, } = context.plotdata;
        const { width, height, } = context.screen;
        const { openPrice: openDataPoint } = context.pool;
        const [x] = datamath_1.default.scale([openDataPoint.timestamp], timerange, width);
        const [y] = datamath_1.default.scaleReverse([openDataPoint.value], pricerange, height);
        const [point, pointstate] = this.get('point', () => this.createPricePoint());
        point.position.set(x, y);
        const priceValue = index_1.default.currency(openDataPoint.value, _constants_1.USD);
        const [coveredText, coveredTextState] = this.get('cover', () => this.createPriceText(priceValue));
        const textGraphic = coveredText.getChildAt(1);
        textGraphic.text = priceValue;
        const { paddingx, paddingy } = this.coverStyle;
        const coverGraphic = coveredText.getChildAt(0);
        const coverWidth = textGraphic.width + paddingx * 2;
        const coverHeight = textGraphic.height + paddingy * 2;
        coverGraphic.width = coverWidth;
        coverGraphic.height = coverHeight;
        coverGraphic.position.x = -coverWidth;
        textGraphic.position.x = -coverWidth + paddingx;
        coveredText.position.set(width - this.coverStyle.paddingRight, y);
        const [line, linestate] = this.get('line', () => _rendering_1.GraphicUtils.createLine([0, 0], [width, 0], this.lineStyle));
        line.position.set(0, y);
        line.width = coveredText.position.x;
        if (linestate.new)
            container.addChild(line);
        if (pointstate.new)
            container.addChild(point);
        if (coveredTextState.new)
            container.addChild(coveredText);
        return container;
    }
    createPriceText(priceValue) {
        const { paddingx, paddingy } = this.coverStyle;
        const text = new pixi_1.Text(priceValue, this.textStyle);
        text.position.set(paddingx, paddingy);
        const width = text.width + paddingx * 2;
        const height = text.height + paddingy * 2;
        const { radius, color } = this.coverStyle;
        const cover = new pixi_1.Graphics()
            .beginFill(color)
            .lineStyle(this.coverStyle.lineStyle)
            .drawRoundedRect(0, 0, width, height, radius)
            .endFill();
        text.position.x = -width + paddingx;
        cover.position.x = -width;
        text.position.y = -height / 2 + paddingy;
        cover.position.y = -height / 2;
        const coveredText = new pixi_1.Container();
        coveredText.addChild(cover, text);
        return coveredText;
    }
    createPricePoint() {
        const inner = _rendering_1.GraphicUtils.createCircle([0, 0], this.torusStyle.innerr, { color: this.torusStyle.innerColor });
        const outer = _rendering_1.GraphicUtils.createCircle([0, 0], this.torusStyle.outerr, { color: this.torusStyle.outerColor });
        const pointer = new pixi_1.Container();
        pointer.addChild(outer, inner);
        return pointer;
    }
}
exports.PoolOpenPriceLineRenderer = PoolOpenPriceLineRenderer;
PoolOpenPriceLineRenderer.POOL_OPEN_PRICE_LINE_ID = Symbol('POOL_OPEN_PRICE_LINE_ID');
//# sourceMappingURL=PoolOpenPriceLineRenderer.js.map