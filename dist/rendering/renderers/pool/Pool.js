"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pool = void 0;
const _rendering_1 = require("../../index.js");
const PoolBackground_1 = require("./PoolBackground");
const PoolLock_1 = require("./PoolLock");
const PoolOpen_1 = require("./PoolOpen");
const PoolCountdown_1 = require("./PoolCountdown");
const PoolResolution_1 = require("./PoolResolution");
const PoolResolutionLine_1 = require("./PoolResolutionLine");
const PoolOpenPriceTag_1 = require("./PoolOpenPriceTag");
const PoolResolutionPriceTag_1 = require("./PoolResolutionPriceTag");
const PoolLayerEventProducer_1 = require("./PoolLayerEventProducer");
class Pool {
    constructor(renderer) {
        this.renderer = renderer;
        this.compositor = new _rendering_1.RenderingCompositor([
            new PoolLayerEventProducer_1.PoolLayerEventProducer(renderer),
            new PoolBackground_1.PoolBackground(renderer),
            new PoolLock_1.PoolLock(renderer),
            new PoolOpen_1.PoolOpen(renderer),
            new PoolResolution_1.PoolResolution(renderer),
            new PoolResolutionLine_1.PoolResolutionLine(renderer),
            new PoolResolutionPriceTag_1.PoolResolutionPriceTag(renderer),
            new PoolOpenPriceTag_1.PoolOpenPriceTag(renderer),
            new PoolCountdown_1.PoolCountdown(renderer),
        ]);
    }
    render(context, done) {
        const render = this.compositor.compose(context, done);
        render();
    }
}
exports.Pool = Pool;
//# sourceMappingURL=Pool.js.map