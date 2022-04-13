"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandleStickView = void 0;
const graphics_1 = require("@pixi/graphics");
const builder_candlestick_1 = require("../../builders/builder.candlestick");
class CandleStickView {
    constructor(state, viewport) {
        this.state = state;
        this.viewport = viewport;
        this.builded = new graphics_1.Graphics();
    }
    get stickWidth() {
        const { viewConfig: { width }, renderConfig: { dateRange, stickIntervalSize } } = this.state;
        return width * (stickIntervalSize.asMilliseconds() / dateRange.duration);
    }
    render() {
        this.buildSticks();
        this.viewport.render(this.builded, CandleStickView.renderKey);
    }
    buildSticks() {
        const { style, viewConfig: { width, height }, renderConfig: { valueRange, dateRange, dataManager } } = this.state;
        const build = (stick) => {
            const builder = new builder_candlestick_1.CandleStickBuilder(stick, style, width, height, this.stickWidth, valueRange, dateRange);
            return builder.build();
        };
        for (const stick of dataManager.data) {
            this.builded.addChild(build(stick));
        }
        return this.builded;
    }
}
exports.CandleStickView = CandleStickView;
CandleStickView.renderKey = 'chart_data_graphics';
//# sourceMappingURL=store.candlestick.view.js.map