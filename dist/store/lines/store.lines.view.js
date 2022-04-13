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
        const { renderConfig: { dataManager }, style: { lineColor } } = this.state;
        const firstPricePointPoint = this.getPricePointPoint(dataManager.data.at(0));
        const line = new graphics_1.Graphics();
        line
            .lineStyle({ width: 1, color: lineColor })
            .moveTo(...firstPricePointPoint);
        for (let i = 1; i < dataManager.data.length; i++) {
            const pricePoint = dataManager.data[i];
            this.moveByPricePoint(line, pricePoint);
        }
        this.builded.addChild(line);
    }
    moveByPricePoint(line, pricePoint) {
        const point = this.getPricePointPoint(pricePoint);
        line.lineTo(...point);
    }
    getPricePointPoint(PricePoint) {
        return [this.getPointX(PricePoint.date), this.getPointY(PricePoint.price)];
    }
    getPointY(value) {
        const { renderConfig: { valueRange }, viewConfig: { height } } = this.state;
        const point = 1 - valueRange.getPointByValue(value);
        return point * height;
    }
    getPointX(timestamp) {
        const { renderConfig: { dateRange }, viewConfig: { width } } = this.state;
        const datePoint = dateRange.getPointByDate(timestamp);
        return datePoint * width;
    }
}
exports.LinesView = LinesView;
LinesView.renderKey = 'chart_data_graphics';
//# sourceMappingURL=store.lines.view.js.map