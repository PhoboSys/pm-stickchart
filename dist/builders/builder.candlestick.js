"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandleStickBuilder = void 0;
const graphics_1 = require("@pixi/graphics");
class CandleStickBuilder extends graphics_1.Graphics {
    constructor(stick, style, screenWidth, screenHeight, stickWidth, valueRange, dateRange) {
        super();
        this.stick = stick;
        this.style = style;
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.stickWidth = stickWidth;
        this.valueRange = valueRange;
        this.dateRange = dateRange;
    }
    get color() {
        const { increaseColor, decreaseColor } = this.style;
        return this.stick.open < this.stick.close ? increaseColor : decreaseColor;
    }
    get centerX() {
        return this.getPointX(this.stick.date) + (this.stickWidth / 2);
    }
    get rectTopY() {
        return this.getPointY(Math.max(this.stick.open, this.stick.close));
    }
    get rectBottomY() {
        return this.getPointY(Math.min(this.stick.open, this.stick.close));
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
        const { stick: { date }, stickWidth, rectTopY, rectBottomY, style: { stickRound } } = this;
        const rectangle = new graphics_1.Graphics();
        const x = this.getPointX(date), y = rectTopY;
        const width = stickWidth, height = rectBottomY - rectTopY;
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
        const datePoint = dateRange.getPointByValue(date);
        return datePoint * screenWidth;
    }
}
exports.CandleStickBuilder = CandleStickBuilder;
//# sourceMappingURL=builder.candlestick.js.map