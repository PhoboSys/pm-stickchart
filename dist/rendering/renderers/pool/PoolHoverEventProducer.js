"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolHoverEventProducer = void 0;
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
const _events_1 = require("../../../events/index.js");
const BasePoolsRenderer_1 = require("./BasePoolsRenderer");
class PoolHoverEventProducer extends BasePoolsRenderer_1.BasePoolsRenderer {
    constructor() {
        super(...arguments);
        this.isHover = {};
    }
    get rendererId() {
        return PoolHoverEventProducer.POOL_HOVER_EVENT_PRODUCER_ID;
    }
    updatePool(pool, context, container) {
        container.alpha = 0;
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
        const [hover, hoverState] = this.get('hover', () => new pixi_1.Graphics());
        hover
            .clear()
            .beginFill()
            .drawPolygon(shape)
            .closePath()
            .endFill();
        if (hoverState.new) {
            container.addChild(hover);
            hover.interactive = true;
            hover.addEventListener('pointerover', (e) => {
                context.eventTarget.dispatchEvent(new _events_1.PoolHoverEvent(poolid, e));
            });
            hover.addEventListener('pointerout', (e) => {
                context.eventTarget.dispatchEvent(new _events_1.PoolUnhoverEvent(poolid, e));
            });
        }
    }
}
exports.PoolHoverEventProducer = PoolHoverEventProducer;
PoolHoverEventProducer.POOL_HOVER_EVENT_PRODUCER_ID = Symbol('POOL_HOVER_EVENT_PRODUCER_ID');
//# sourceMappingURL=PoolHoverEventProducer.js.map