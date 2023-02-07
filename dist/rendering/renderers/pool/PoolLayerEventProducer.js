"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolLayerEventProducer = void 0;
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
const _events_1 = require("../../../events/index.js");
const BasePoolsRenderer_1 = require("./BasePoolsRenderer");
class PoolLayerEventProducer extends BasePoolsRenderer_1.BasePoolsRenderer {
    constructor() {
        super(...arguments);
        this.isHover = {};
    }
    get rendererId() {
        return PoolLayerEventProducer.POOL_LAYER_EVENT_PRODUCER_ID;
    }
    updatePool(pool, context, container) {
        container.alpha = 0;
        this.updateEvent(pool, context, container);
    }
    updateEvent(pool, context, container) {
        const { width, height } = context.screen;
        const { timerange } = context.plotdata;
        const { startDate, endDate, poolid } = pool;
        const [ox, rx] = datamath_1.default.scale([startDate, endDate], timerange, width);
        const shape = [
            ox, 0,
            rx, 0,
            rx, height,
            ox, height,
        ];
        const [layer, layerState] = this.get('layer', () => new pixi_1.Graphics());
        layer
            .clear()
            .beginFill()
            .drawPolygon(shape)
            .closePath()
            .endFill();
        if (layerState.new) {
            container.addChild(layer);
            layer.interactive = true;
            context.eventTarget.addEventListener('poolpin', (e) => {
                if (layerState.pined && e.poolid !== poolid) {
                    layerState.pined = false;
                    context.eventTarget.dispatchEvent(new _events_1.PoolUnpinEvent(poolid, e));
                }
            });
            layer.addEventListener('pointerover', (e) => {
                context.eventTarget.dispatchEvent(new _events_1.PoolHoverEvent(poolid, e));
            });
            layer.addEventListener('pointerout', (e) => {
                context.eventTarget.dispatchEvent(new _events_1.PoolUnhoverEvent(poolid, e));
            });
            layer.addEventListener('pointertap', (e) => {
                if (layerState.pined) {
                    context.eventTarget.dispatchEvent(new _events_1.PoolUnpinEvent(poolid, e));
                }
                else {
                    context.eventTarget.dispatchEvent(new _events_1.PoolPinEvent(poolid, e));
                }
                layerState.pined = !layerState.pined;
            });
        }
        if (!this.isActualPool(pool)) {
            layer.cursor = 'pointer';
        }
    }
}
exports.PoolLayerEventProducer = PoolLayerEventProducer;
PoolLayerEventProducer.POOL_LAYER_EVENT_PRODUCER_ID = Symbol('POOL_LAYER_EVENT_PRODUCER_ID');
//# sourceMappingURL=PoolLayerEventProducer.js.map