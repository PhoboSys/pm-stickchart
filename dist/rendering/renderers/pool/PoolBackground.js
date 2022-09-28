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
            fadein: {
                pixi: {
                    alpha: 0.1,
                },
                duration: 0.5,
                ease: 'back.out(4)',
                clear: true,
            },
            fadeout: {
                pixi: {
                    alpha: 0,
                },
                duration: 0.5,
                ease: 'power2.out',
                delay: 0.5,
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
        this.updateBackground(pool, context, container);
    }
    updateBackground(pool, context, container) {
        const { width, height, } = context.screen;
        const { timerange } = context.plotdata;
        const { openDate, resolutionDate, poolid } = pool;
        const [ox, rx] = datamath_1.default.scale([openDate, resolutionDate], timerange, width);
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
                    this.animate('group', 'fadein');
                });
                context.eventTarget.addEventListener('poolunhover', (e) => {
                    if (e.poolid !== poolid)
                        return;
                    this.rebind(poolid);
                    this.animate('group', 'fadeout');
                });
            }
            if (groupstate.animation !== 'fadein') {
                this.animate('group', 'fadeout');
            }
        }
        else if (this.isActualPool(pool)) {
            group.alpha = 0.15;
        }
        else if (group.alpha !== 0) {
            this.animate('group', 'fadeout');
        }
    }
}
exports.PoolBackground = PoolBackground;
PoolBackground.POOL_BACKGROUND_ID = Symbol('POOL_BACKGROUND_ID');
//# sourceMappingURL=PoolBackground.js.map