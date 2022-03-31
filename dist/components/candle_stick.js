"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandleStick = void 0;
const graphics_1 = require("@pixi/graphics");
class CandleStick extends graphics_1.Graphics {
    constructor({ low, high, open, close, time, stickChart }) {
        super();
        this.low = low;
        this.high = high;
        this.open = open;
        this.close = close;
        this.time = time;
        this.stickChart = stickChart;
    }
    get color() {
        return this.open < this.close ? 0x00FF00 : 0xFF0000;
    }
    get stickWidth() {
        const { renderDateRange, stickDateInterval: stickInterval, width: chartWidth } = this.stickChart;
        return chartWidth * (stickInterval.asMilliseconds() / renderDateRange.milliseconds);
    }
    get rectHeight() {
        return this.valueIntoSize(Math.abs(this.open - this.close));
    }
    get centerX() {
        return this.timeIntoX(this.time) + (this.stickWidth / 2);
    }
    get rectTopY() {
        return this.valueIntoY(Math.max(this.open, this.close));
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
            .moveTo(this.centerX, this.valueIntoY(this.high))
            .lineTo(this.centerX, this.valueIntoY(this.low));
        super.addChild(line);
    }
    buildRectangle() {
        const rectangle = new graphics_1.Graphics();
        const x = this.timeIntoX(this.time), y = this.rectTopY;
        const width = this.stickWidth, height = this.rectHeight;
        rectangle
            .beginFill(this.color)
            .drawRect(x, y, width, height)
            .endFill();
        super.addChild(rectangle);
    }
    valueIntoY(value) {
        const { valueRange, height } = this.stickChart;
        const valuePoint = 1 - valueRange.findValuePoint(value);
        return valuePoint * height;
    }
    valueIntoSize(value) {
        const { valueRange, height } = this.stickChart;
        const valuePoint = valueRange.findValuePoint(value);
        return valuePoint * height;
    }
    timeIntoX(time) {
        const { renderDateRange, width } = this.stickChart;
        const timePoint = renderDateRange.findTimePoint(time);
        return timePoint * width;
    }
}
exports.CandleStick = CandleStick;
//# sourceMappingURL=candle_stick.js.map