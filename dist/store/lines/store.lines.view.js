"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinesView = void 0;
const graphics_1 = require("@pixi/graphics");
class LinesView {
    constructor(state, viewport) {
        this.state = state;
        this.viewport = viewport;
        this.builded = new graphics_1.Graphics();
    }
    render() {
        this.buildLines();
        this.viewport.render(this.builded, LinesView.renderKey);
    }
    buildLines() {
        const { dataManager } = this.state;
        const line = this.createLine();
        for (let i = 1; i < dataManager.length; i++) {
            const pricePoint = dataManager.at(i);
            this.lineToPricePoint(line, pricePoint);
        }
        this.builded.addChild(line);
    }
    createLine() {
        const { dataManager, basicConfig: { style: { lineColor, lineWidth } } } = this.state;
        const line = new graphics_1.Graphics();
        const firstPricePoint = dataManager.at(0);
        line
            .lineStyle({ width: lineWidth, color: lineColor })
            .moveTo(...this.getPointByPricePoint(firstPricePoint));
        return line;
    }
    lineToPricePoint(line, pricePoint) {
        const point = this.getPointByPricePoint(pricePoint);
        line.lineTo(...point);
    }
    getPointByPricePoint(pricePoint) {
        return [this.getPointX(pricePoint.date), this.getPointY(pricePoint.price)];
    }
    getPointY(value) {
        const { renderConfig: { priceRange: valueRange }, basicConfig: { height } } = this.state;
        const point = 1 - valueRange.getPointByValue(value);
        return point * height;
    }
    getPointX(date) {
        const { renderConfig: { dateRange }, basicConfig: { width } } = this.state;
        const datePoint = dateRange.getPointByValue(date);
        return datePoint * width;
    }
}
exports.LinesView = LinesView;
LinesView.renderKey = 'chart_data_graphics';
//# sourceMappingURL=store.lines.view.js.map