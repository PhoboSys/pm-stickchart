"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PariClaimBackground = void 0;
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
const enums_1 = require("../../../enums");
const textures_1 = require("../../textures");
const BaseParisRenderer_1 = require("./BaseParisRenderer");
class PariClaimBackground extends BaseParisRenderer_1.BaseParisRenderer {
    constructor() {
        super(...arguments);
        this.validPariPositions = {
            [enums_1.EPosition.Up]: enums_1.EPosition.Up,
            [enums_1.EPosition.Down]: enums_1.EPosition.Down,
            [enums_1.EPosition.Zero]: enums_1.EPosition.Zero,
        };
        this.configAnimations = {
            pulsar: {
                pixi: {
                    alpha: 0.2,
                    scaleY: 3,
                },
                duration: 4,
                ease: 'back.inOut(4)',
                repeat: -1,
                yoyo: true,
                yoyoEase: 'power3.in',
            },
            hide: {
                pixi: {
                    alpha: 0,
                },
                duration: 1,
                ease: 'power3.out',
                clear: true,
            }
        };
    }
    get rendererId() {
        return PariClaimBackground.PARI_CLAIM_BACKGROUND_ID;
    }
    get animations() {
        return this.configAnimations;
    }
    updatePari(pool, pari, context, container) {
        if (!(pari.position in this.validPariPositions))
            return this.clear();
        if (!this.isHistoricalPool(pool, context))
            return this.clear();
        const rprice = this.getResolutionPricePoint(pool, context);
        const resolution = this.getPoolResolution(pool, context);
        const win = pari.position === resolution;
        const nocontest = resolution === enums_1.EPosition.NoContest;
        const claimable = !pari.claimed && (win || nocontest);
        if (!claimable)
            return this.animate('group', 'hide', { onComplete: () => this.clear() });
        this.updateBackground(pool, pari, context, container, rprice);
    }
    updateBackground(pool, pari, context, container, resolutionPrice) {
        const { width, height } = context.screen;
        const { timerange } = context.plotdata;
        const { openPriceTimestamp, resolutionDate, poolid } = pool;
        const rdate = (resolutionPrice === null || resolutionPrice === void 0 ? void 0 : resolutionPrice.timestamp) || resolutionDate;
        const [ox, rx] = datamath_1.default.scale([openPriceTimestamp, rdate], timerange, width);
        const shape = [
            ox, 0,
            rx, 0,
            rx, height,
            ox, height,
        ];
        const [group, groupstate] = this.get('group', () => new pixi_1.Graphics());
        if (groupstate.new) {
            group.position.y = -height / 4;
            group.alpha = 0;
            container.addChild(group);
        }
        const [gradient, gradientState] = this.get('gradient', () => new pixi_1.Graphics());
        if (gradientState.new)
            group.addChild(gradient);
        gradient
            .clear()
            .beginTextureFill({
            texture: context.textures.get(textures_1.POOL_CLAIM_TEXTURE),
        })
            .drawPolygon(shape)
            .closePath()
            .endFill();
        this.animate('group', 'pulsar');
    }
}
exports.PariClaimBackground = PariClaimBackground;
PariClaimBackground.PARI_CLAIM_BACKGROUND_ID = Symbol('PARI_CLAIM_BACKGROUND_ID');
//# sourceMappingURL=PariClaimBackground.js.map