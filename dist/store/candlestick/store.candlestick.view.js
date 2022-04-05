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
        const { width, stickIntervalWidth, renderDateRange } = this.state;
        return width * (stickIntervalWidth.asMilliseconds() / renderDateRange.duration);
    }
    render() {
        this.buildSticks();
        this.viewport.keyRender(this.builded, CandleStickView.renderKey);
    }
    buildSticks() {
        const { stickWidth, state: { width, height, valueRange, renderDateRange, renderSticks } } = this;
        const build = (stick) => {
            const builder = new builder_candlestick_1.CandleStickBuilder(stick, width, height, stickWidth, valueRange, renderDateRange);
            return builder.build();
        };
        for (const stick of renderSticks) {
            this.builded.addChild(build(stick));
        }
        return this.builded;
    }
}
exports.CandleStickView = CandleStickView;
CandleStickView.renderKey = 'candle_sticks_graphics';
//# sourceMappingURL=store.candlestick.view.js.map