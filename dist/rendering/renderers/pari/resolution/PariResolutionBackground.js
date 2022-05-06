"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PariResolutionBackground = void 0;
const pixi_1 = require("../../../../lib/pixi");
const datamath_1 = __importDefault(require("../../../../lib/datamath"));
const __1 = require("../../..");
const __2 = require("../../..");
class PariResolutionBackground extends __1.BaseRenderer {
    constructor(renderer) {
        super(renderer);
    }
    get rendererId() {
        return PariResolutionBackground.PARI_RESOLUTION_ID;
    }
    update(context, container) {
        var _a, _b, _c;
        if (!context.pool ||
            !context.pool.openPrice ||
            !((_a = context.paris) === null || _a === void 0 ? void 0 : _a.length)) {
            this.clear();
            return container;
        }
        // clear if pool metaid changed
        if (this.renderedMetaId && this.renderedMetaId !== context.pool.metaid) {
            this.clear();
        }
        this.renderedMetaId = context.pool.metaid;
        const { openDate, resolutionDate, openPrice } = context.pool;
        const { width, height } = context.screen;
        const { xrange, yrange } = context.plotdata;
        const [ox, rx] = datamath_1.default.scale([openDate, resolutionDate], xrange, width);
        const [y] = datamath_1.default.scaleReverse([openPrice.value], yrange, height);
        // clear if one dissapeared
        const paris = {};
        for (const pari of context.paris)
            paris[pari.position] = pari;
        if (!paris['POS'])
            this.clear('gradientPos');
        if (!paris['NEG'])
            this.clear('gradientNeg');
        const anim = {
            high: {
                pixi: {
                    height: height * 0.9,
                    alpha: 0.3,
                },
                duration: 0.5,
                ease: 'back.inOut(2)',
            },
            low: {
                pixi: {
                    height: height * 0.4,
                    alpha: 0.15,
                },
                duration: 0.5,
                ease: 'back.inOut(2)',
            },
            settle: {
                pixi: {
                    height: height * 0.9,
                    alpha: 0.6,
                },
                duration: 4,
                ease: 'power2.inOut',
                repeat: -1,
                yoyo: true,
                yoyoEase: 'power3.in',
            }
        };
        // pool
        const { pool } = context;
        for (const pari of context.paris) {
            if (pari.position === 'POS') {
                const [gradientPos, statepos] = this.get('gradientPos', () => new pixi_1.Sprite(context.textures.get(__2.UP_WAGET_TEXTURE)));
                if (statepos.new)
                    container.addChild(gradientPos);
                gradientPos.position.set(ox, y);
                gradientPos.width = rx - ox;
                // flip
                if (statepos.new)
                    gradientPos.scale.y *= -1;
                if (pari.position === pool.resolution) {
                    if (statepos.new) {
                        gradientPos.alpha = anim.high.pixi.alpha;
                        gradientPos.height = anim.high.pixi.height;
                    }
                    if (pool.settling) {
                        if (statepos.animation !== 'settle') {
                            statepos.animation = 'settle';
                            statepos.timeline = pixi_1.gsap.to(gradientPos, anim.settle);
                        }
                    }
                    else {
                        if (statepos.animation !== 'high') {
                            statepos.animation = 'high';
                            statepos.timeline = pixi_1.gsap.to(gradientPos, anim.high);
                        }
                    }
                }
                else {
                    if (statepos.new) {
                        gradientPos.alpha = anim.low.pixi.alpha;
                        gradientPos.height = anim.low.pixi.height;
                    }
                    if (statepos.animation !== 'low') {
                        statepos.animation = 'low';
                        statepos.timeline = pixi_1.gsap.to(gradientPos, anim.low);
                    }
                }
            }
            if (pari.position === 'NEG') {
                const [gradientNeg, stateneg] = this.get('gradientNeg', () => new pixi_1.Sprite(context.textures.get(__2.DOWN_WAGET_TEXTURE)));
                if (stateneg.new)
                    container.addChild(gradientNeg);
                gradientNeg.position.set(ox, y);
                gradientNeg.width = rx - ox;
                if (pari.position === pool.resolution) {
                    if (stateneg.new) {
                        gradientNeg.alpha = anim.high.pixi.alpha;
                        gradientNeg.height = anim.high.pixi.height;
                    }
                    if (pool.settling) {
                        if (stateneg.animation !== 'settle') {
                            stateneg.animation = 'settle';
                            stateneg.timeline = pixi_1.gsap.to(gradientNeg, anim.settle);
                        }
                    }
                    else {
                        if (stateneg.animation !== 'high') {
                            stateneg.animation = 'high';
                            (_b = stateneg.timeline) === null || _b === void 0 ? void 0 : _b.kill();
                            stateneg.timeline = pixi_1.gsap.to(gradientNeg, anim.high);
                        }
                    }
                }
                else {
                    if (stateneg.new) {
                        gradientNeg.alpha = anim.low.pixi.alpha;
                        gradientNeg.height = anim.low.pixi.height;
                    }
                    if (stateneg.animation !== 'low') {
                        stateneg.animation = 'low';
                        (_c = stateneg.timeline) === null || _c === void 0 ? void 0 : _c.kill();
                        stateneg.timeline = pixi_1.gsap.to(gradientNeg, anim.low);
                    }
                }
            }
        }
        return container;
    }
}
exports.PariResolutionBackground = PariResolutionBackground;
PariResolutionBackground.PARI_RESOLUTION_ID = Symbol('PARI_RESOLUTION_BG_ID');
//# sourceMappingURL=PariResolutionBackground.js.map