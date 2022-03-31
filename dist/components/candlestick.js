"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandleStick = void 0;
const graphics_1 = require("@pixi/graphics");
class CandleStick extends graphics_1.Graphics {
    constructor({ low, high, open, close, time, chartOptions }) {
        super();
        this.low = low;
        this.high = high;
        this.open = open;
        this.close = close;
        this.time = time;
        this.chartOptions = chartOptions;
    }
    get color() {
        return this.open < this.close ? 0x00FF00 : 0xFF0000;
    }
    get stickWidth() {
        const { dateRange, stickDateInterval: stickInterval, width: chartWidth } = this.chartOptions;
        return chartWidth * (stickInterval.milliseconds / dateRange.milliseconds);
    }
    get rectHeight() {
        return this.valueIntoY(Math.abs(this.open - this.close));
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
        const { valueRange, height } = this.chartOptions;
        const valuePoint = 1 - valueRange.findValuePoint(value);
        return valuePoint * height;
    }
    valueIntoSize(value) {
        const { valueRange, height } = this.chartOptions;
        const valuePoint = valueRange.findValuePoint(value);
        return valuePoint * height;
    }
    timeIntoX(time) {
        const { dateRange, width } = this.chartOptions;
        const timePoint = dateRange.findTimePoint(time);
        return timePoint * width;
    }
}
exports.CandleStick = CandleStick;
//# sourceMappingURL=candlestick.js.map