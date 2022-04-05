"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandleStickBuilder = void 0;
const graphics_1 = require("@pixi/graphics");
class CandleStickBuilder extends graphics_1.Graphics {
    constructor(stick, screenWidth, screenHeight, stickWidth, renderValueRange, renderDateRange) {
        super();
        this.stick = stick;
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.stickWidth = stickWidth;
        this.renderValueRange = renderValueRange;
        this.renderDateRange = renderDateRange;
    }
    get color() {
        return this.stick.open < this.stick.close ? 0x00FF00 : 0xFF0000;
    }
    get rectHeight() {
        const { renderValueRange, screenHeight, stick } = this;
        const distance = Math.abs(stick.open - stick.close);
        const point = renderValueRange.getPointByValue(distance);
        return point * screenHeight;
    }
    get centerX() {
        return this.getPointX(this.stick.date) + (this.stickWidth / 2);
    }
    get rectTopY() {
        return this.getPointY(Math.max(this.stick.open, this.stick.close));
    }
    build() {
        this.buildLine();
        this.buildRectangle();
        return this;
    }
    buildLine() {
        const { centerX, stick: { high, low } } = this;
        const line = new graphics_1.Graphics();
        line
            .lineStyle({ width: 1, color: this.color })
            .moveTo(centerX, this.getPointY(high))
            .lineTo(centerX, this.getPointY(low));
        super.addChild(line);
    }
    buildRectangle() {
        const { stick: { date }, rectTopY, rectHeight, stickWidth } = this;
        const rectangle = new graphics_1.Graphics();
        const x = this.getPointX(date), y = rectTopY;
        const width = stickWidth, height = rectHeight;
        rectangle
            .beginFill(this.color)
            .drawRect(x, y, width, height)
            .endFill();
        super.addChild(rectangle);
    }
    getPointY(value) {
        const { renderValueRange, screenHeight } = this;
        const point = 1 - renderValueRange.getPointByValue(value);
        return point * screenHeight;
    }
    getPointX(date) {
        const { renderDateRange, screenWidth } = this;
        const datePoint = renderDateRange.getPointByDate(date);
        return datePoint * screenWidth;
    }
}
exports.CandleStickBuilder = CandleStickBuilder;
//# sourceMappingURL=builder.candlestick.js.map