"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolBackground = void 0;
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
const symbols_1 = require("../../textures/symbols");
const BasePoolsRenderer_1 = require("./BasePoolsRenderer");
class PoolBackground extends BasePoolsRenderer_1.BasePoolsRenderer {
    constructor() {
        super(...arguments);
        this.configAnimations = {
            hover_group: {
                pixi: {
                    alpha: 0.1,
                },
                duration: 0.5,
                ease: 'back.out(4)',
                clear: true,
            },
            unhover_group: {
                pixi: {
                    alpha: 0,
                },
                duration: 0.5,
                ease: 'power2.out',
                delay: 0.5,
            },
            actual_group: {
                pixi: {
                    alpha: 0.15,
                },
                duration: 0.5,
                ease: 'back.out(4)',
            }
        };
    }
    get rendererId() {
        return PoolBackground.POOL_BACKGROUND_ID;
    }
    get animations() {
        return this.configAnimations;
    }
    updatePool(pool, context, container) {
        if (!pool.openPriceTimestamp || !pool.openPriceValue)
            return this.clear();
        this.updateBackground(pool, context, container);
    }
    updateBackground(pool, context, container) {
        const { width, height, } = context.screen;
        const { timerange } = context.plotdata;
        const { openPriceTimestamp, resolutionDate, poolid } = pool;
        let rdate = resolutionDate;
        if (this.isHistoricalPool(pool, context)) {
            const resolution = this.getResolutionPricePoint(pool, context);
            if (resolution === null || resolution === void 0 ? void 0 : resolution.timestamp)
                rdate = resolution === null || resolution === void 0 ? void 0 : resolution.timestamp;
        }
        const [ox, rx] = datamath_1.default.scale([openPriceTimestamp, rdate], timerange, width);
        const shape = [
            ox, 0,
            rx, 0,
            rx, height,
            ox, height,
        ];
        const [group, groupstate] = this.get('group', () => new pixi_1.Graphics());
        if (groupstate.new) {
            group.alpha = 0;
            container.addChild(group);
        }
        const [gradient, gradientState] = this.get('gradient', () => new pixi_1.Graphics());
        if (gradientState.new)
            group.addChild(gradient);
        gradient
            .clear()
            .beginTextureFill({
            texture: context.textures.get(symbols_1.POOL_ROUND_TEXTURE),
        })
            .drawPolygon(shape)
            .closePath()
            .endFill();
        if (this.isHistoricalPool(pool, context)) {
            const poolid = pool.poolid;
            if (!groupstate.subscribed) {
                groupstate.subscribed = true;
                context.eventTarget.addEventListener('poolhover', (e) => {
                    if (e.poolid !== poolid)
                        return;
                    this.rebind(poolid);
                    this.animate('group', 'hover_group');
                });
                context.eventTarget.addEventListener('poolunhover', (e) => {
                    if (e.poolid !== poolid)
                        return;
                    this.rebind(poolid);
                    this.animate('group', 'unhover_group');
                });
            }
            if (groupstate.animation !== 'hover_group')
                this.animate('group', 'unhover_group');
        }
        if (this.isActualPool(pool))
            this.animate('group', 'actual_group');
    }
}
exports.PoolBackground = PoolBackground;
PoolBackground.POOL_BACKGROUND_ID = Symbol('POOL_BACKGROUND_ID');
//# sourceMappingURL=PoolBackground.js.map