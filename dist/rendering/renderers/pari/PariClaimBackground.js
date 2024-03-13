"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PariClaimBackground = void 0;
const textures_1 = require("../../textures");
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
const _enums_1 = require("../../../enums/index.js");
const _rendering_1 = require("../../index.js");
const BaseParisRenderer_1 = require("./BaseParisRenderer");
class PariClaimBackground extends BaseParisRenderer_1.BaseParisRenderer {
    constructor() {
        super(...arguments);
        this.validPariPositions = {
            [_enums_1.EPosition.Up]: _enums_1.EPosition.Up,
            [_enums_1.EPosition.Down]: _enums_1.EPosition.Down,
            [_enums_1.EPosition.Zero]: _enums_1.EPosition.Zero,
        };
        this.gradientStyle = {
            alpha: 0.39,
            hover: {
                alpha: 0.20,
            }
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
            },
            hover_group: {
                pixi: {
                    alpha: 0.39,
                },
                duration: 0.5,
                ease: 'back.out(4)',
                clear: true,
            },
            unhover_group: {
                pixi: {
                    alpha: 0.20,
                },
                duration: 0.5,
                ease: 'power2.out',
                delay: 0.5,
            },
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
        const undef = resolution === _enums_1.EPosition.Undefined;
        const win = pari.position === resolution;
        const nocontest = resolution === _enums_1.EPosition.NoContest;
        if (undef || !(win || nocontest))
            return this.clear();
        const poolid = pool.poolid;
        const pariid = pari.pariid;
        const reverted = _rendering_1.EntityUtils.isEnityReverted(context, pariid);
        const orphan = pari.phantom && reverted;
        const claimable = !pari.claimed && (win || nocontest) && !orphan;
        if (!claimable)
            return this.animate('group', 'hide', {
                onComplete: () => {
                    this.rebind(poolid, pariid);
                    this.clear();
                }
            });
        this.updateBackground(pool, pari, context, container, rprice);
    }
    updateBackground(pool, pari, context, container, resolutionPrice) {
        const { width, height } = context.screen;
        const { timerange } = context.plotdata;
        const { openPriceTimestamp, endDate } = pool;
        const rdate = (resolutionPrice === null || resolutionPrice === void 0 ? void 0 : resolutionPrice.timestamp) || endDate;
        const [ox, rx] = datamath_1.default.scale([openPriceTimestamp, rdate], timerange, width);
        const shape = [
            ox, 0,
            rx, 0,
            rx, height,
            ox, height,
        ];
        const [group, groupstate] = this.get('group', () => new pixi_1.Graphics());
        if (groupstate.new) {
            // group.position.y = -height/4
            // group.alpha = 0
            container.addChild(group);
        }
        const [gradientTexture] = this.get('gradientTexture', () => context.textures.get(textures_1.GRADIENT_TEXTURE, {
            width,
            height,
            points: [0, 0, 0, height],
            colorStops: [
                { color: '#F7C15BFF', offset: 0 },
                { color: '#F7C15BFF', offset: 0.27 },
                { color: '#F7C15B00', offset: 0.79 },
                { color: '#F7C15B00', offset: 1 },
            ],
        }), [height, width]);
        const [gradient, gradientState] = this.get('gradient', () => new pixi_1.Graphics());
        if (gradientState.new)
            group.addChild(gradient);
        if (!gradientState.subscribed) {
            gradientState.subscribed = true;
            const poolid = pool.poolid;
            const pariid = pari.pariid;
            context.eventTarget.addEventListener('poolhover', (e) => {
                if (e.poolid !== poolid)
                    return;
                // console.log('poolhover')
                this.rebind(poolid, pariid);
                this.animate('group', 'hover_group');
            });
            context.eventTarget.addEventListener('poolunhover', (e) => {
                if (e.poolid !== poolid)
                    return;
                // console.log('poolunhover')
                this.rebind(poolid, pariid);
                this.animate('group', 'unhover_group');
            });
        }
        if (groupstate.animation !== 'hover_group')
            this.animate('group', 'unhover_group');
        gradient
            .clear()
            .beginTextureFill({ texture: gradientTexture })
            .drawPolygon(shape)
            .closePath()
            .endFill();
        // this.animate('group', 'pulsar')
    }
}
exports.PariClaimBackground = PariClaimBackground;
PariClaimBackground.PARI_CLAIM_BACKGROUND_ID = Symbol('PARI_CLAIM_BACKGROUND_ID');
//# sourceMappingURL=PariClaimBackground.js.map