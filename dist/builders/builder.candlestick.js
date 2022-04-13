"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandleStickBuilder = void 0;
const graphics_1 = require("@pixi/graphics");
class CandleStickBuilder extends graphics_1.Graphics {
    constructor(data, style, screenWidth, screenHeight, stickWidth, valueRange, dateRange) {
        super();
        this.data = data;
        this.style = style;
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.stickWidth = stickWidth;
        this.valueRange = valueRange;
        this.dateRange = dateRange;
    }
    get color() {
        const { increaseColor, decreaseColor } = this.style;
        return this.data.open < this.data.close ? increaseColor : decreaseColor;
    }
    get rectHeight() {
        const { valueRange, screenHeight, data } = this;
        const distance = Math.abs(data.open - data.close);
        const point = valueRange.getPointByValue(distance);
        return point * screenHeight;
    }
    get centerX() {
        return this.getPointX(this.data.date) + (this.stickWidth / 2);
    }
    get rectTopY() {
        return this.getPointY(Math.max(this.data.open, this.data.close));
    }
    build() {
        this.buildLine();
        this.buildRectangle();
        return this;
    }
    buildLine() {
        const { centerX, data: { high, low } } = this;
        const line = new graphics_1.Graphics();
        console.log(this.rectTopY, Math.max(this.data.open, this.data.close));
        line
            .lineStyle({ width: 1, color: this.color })
            .moveTo(centerX, this.getPointY(high))
            .lineTo(centerX, this.getPointY(low));
        super.addChild(line);
    }
    buildRectangle() {
        const { data: { date }, rectTopY, rectHeight, stickWidth, style: { stickRound } } = this;
        const rectangle = new graphics_1.Graphics();
        const x = this.getPointX(date), y = rectTopY;
        const width = stickWidth, height = rectHeight;
        rectangle
            .beginFill(this.color)
            .drawRoundedRect(x, y, width, height, stickRound)
            .endFill();
        super.addChild(rectangle);
    }
    getPointY(value) {
        const { valueRange, screenHeight } = this;
        const point = 1 - valueRange.getPointByValue(value);
        return point * screenHeight;
    }
    getPointX(date) {
        const { dateRange, screenWidth } = this;
        const datePoint = dateRange.getPointByDate(date);
        return datePoint * screenWidth;
    }
}
exports.CandleStickBuilder = CandleStickBuilder;
//# sourceMappingURL=builder.candlestick.js.map