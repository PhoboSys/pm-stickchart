"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandleStick = void 0;
const graphics_1 = require("@pixi/graphics");
class CandleStick extends graphics_1.Graphics {
    constructor({ low, high, open, close, date, width, height, renderDateRange, stickIntervalWidth, valueRange }) {
        super();
        this.low = low;
        this.high = high;
        this.open = open;
        this.close = close;
        this.date = date;
        this.screenWidth = width;
        this.screenHeight = height;
        this.renderDateRange = renderDateRange;
        this.stickIntervalWidth = stickIntervalWidth;
        this.valueRange = valueRange;
    }
    get color() {
        return this.open < this.close ? 0x00FF00 : 0xFF0000;
    }
    get rectWidth() {
        const { screenWidth, stickIntervalWidth, renderDateRange } = this;
        return screenWidth * (stickIntervalWidth.asMilliseconds() / renderDateRange.duration);
    }
    get rectHeight() {
        const { valueRange, screenHeight } = this;
        const valuePoint = valueRange.findValuePoint(Math.abs(this.open - this.close));
        return valuePoint * screenHeight;
    }
    get centerX() {
        return this.getPointX(this.date) + (this.rectWidth / 2);
    }
    get rectTopY() {
        return this.getPointY(Math.max(this.open, this.close));
    }
    build() {
        this.buildLine();
        this.buildRectangle();
        return this;
    }
    buildLine() {
        const line = new graphics_1.Graphics();
        line
            .lineStyle({ width: 1, color: this.color })
            .moveTo(this.centerX, this.getPointY(this.high))
            .lineTo(this.centerX, this.getPointY(this.low));
        super.addChild(line);
    }
    buildRectangle() {
        const rectangle = new graphics_1.Graphics();
        const x = this.getPointX(this.date), y = this.rectTopY;
        const width = this.rectWidth, height = this.rectHeight;
        rectangle
            .beginFill(this.color)
            .drawRect(x, y, width, height)
            .endFill();
        super.addChild(rectangle);
    }
    getPointY(value) {
        const { valueRange, screenHeight } = this;
        const valuePoint = 1 - valueRange.findValuePoint(value);
        return valuePoint * screenHeight;
    }
    getPointX(date) {
        const { renderDateRange, screenWidth } = this;
        const datePoint = renderDateRange.getPointByDate(date);
        return datePoint * screenWidth;
    }
}
exports.CandleStick = CandleStick;
//# sourceMappingURL=CandleStick.js.map