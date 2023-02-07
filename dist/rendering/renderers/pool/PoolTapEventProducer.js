"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolTapEventProducer = void 0;
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
const _events_1 = require("../../../events/index.js");
const BasePoolsRenderer_1 = require("./BasePoolsRenderer");
class PoolTapEventProducer extends BasePoolsRenderer_1.BasePoolsRenderer {
    get rendererId() {
        return PoolTapEventProducer.POOL_TAP_EVENT_PRODUCER_ID;
    }
    updatePool(pool, context, container) {
        container.alpha = 1;
        this.updateEvent(pool, context, container);
    }
    updateEvent(pool, context, container) {
        const { width, height, } = context.screen;
        const { timerange } = context.plotdata;
        const { startDate, endDate, poolid } = pool;
        const [ox, rx] = datamath_1.default.scale([startDate, endDate], timerange, width);
        const shape = [
            ox, 0,
            rx, 0,
            rx, height,
            ox, height,
        ];
        const [tap, tapState] = this.get('tap', () => new pixi_1.Graphics());
        tap
            .clear()
            .beginFill()
            .drawPolygon(shape)
            .closePath()
            .endFill();
        if (tapState.new) {
            container.addChild(tap);
            tap.interactive = true;
            tap.addEventListener('pointertap', (e) => {
                console.log('first');
                context.eventTarget.dispatchEvent(new _events_1.PoolTapEvent(poolid, e));
            });
        }
    }
}
exports.PoolTapEventProducer = PoolTapEventProducer;
PoolTapEventProducer.POOL_TAP_EVENT_PRODUCER_ID = Symbol('POOL_TAP_EVENT_PRODUCER_ID');
//# sourceMappingURL=PoolTapEventProducer.js.map