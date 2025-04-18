"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoundLayerEventProducer = void 0;
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
const _events_1 = require("../../../events/index.js");
const BaseRoundsRenderer_1 = require("./BaseRoundsRenderer");
class RoundLayerEventProducer extends BaseRoundsRenderer_1.BaseRoundsRenderer {
    constructor() {
        super(...arguments);
        this.isHover = {};
    }
    get rendererId() {
        return RoundLayerEventProducer.ROUND_LAYER_EVENT_PRODUCER_ID;
    }
    updateRound(round, context, container) {
        container.alpha = 0;
        this.updateEvent(round, context, container);
    }
    updateEvent(round, context, container) {
        const { width, height } = context.screen;
        const { timerange } = context.plotdata;
        const { startDate, endDate, roundid } = round;
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
            layer.addEventListener('pointerdown', (e) => {
                if (e.buttons === 1) {
                    this.moved = false;
                    this.lastTouch = { x: e.x, y: e.y };
                }
            });
            layer.addEventListener('pointermove', (e) => {
                if (e.buttons === 1) {
                    if (this.lastTouch && (this.lastTouch.x !== e.x || this.lastTouch.y !== e.y)) {
                        this.moved = true;
                    }
                }
            });
            layer.addEventListener('pointerup', (e) => {
                if (!this.moved) {
                    if (layerState.pined) {
                        context.eventTarget.dispatchEvent(new _events_1.RoundUnpinEvent(roundid, e));
                    }
                    else {
                        context.eventTarget.dispatchEvent(new _events_1.RoundPinEvent(roundid, e));
                    }
                }
            });
            layer.addEventListener('pointerover', (e) => {
                context.eventTarget.dispatchEvent(new _events_1.RoundHoverEvent(roundid, e));
            });
            layer.addEventListener('pointerout', (e) => {
                context.eventTarget.dispatchEvent(new _events_1.RoundUnhoverEvent(roundid, e));
            });
        }
        if (!this.isActualRound(round, context)) {
            layer.cursor = 'pointer';
        }
        if (context.focusroundid === roundid && !layerState.pined) {
            context.eventTarget.dispatchEvent(new _events_1.RoundPinEvent(roundid));
            layerState.pined = true;
        }
        if (context.focusroundid !== roundid && layerState.pined) {
            context.eventTarget.dispatchEvent(new _events_1.RoundUnpinEvent(roundid));
            layerState.pined = false;
        }
    }
}
exports.RoundLayerEventProducer = RoundLayerEventProducer;
RoundLayerEventProducer.ROUND_LAYER_EVENT_PRODUCER_ID = Symbol('ROUND_LAYER_EVENT_PRODUCER_ID');
//# sourceMappingURL=RoundLayerEventProducer.js.map