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
        var _a;
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
        const { xrange, yrange, ylast } = context.plotdata;
        const [ox, rx] = datamath_1.default.scale([openDate, resolutionDate], xrange, width);
        const [yr] = datamath_1.default.scale([openPrice.value], yrange, height);
        const y = height - yr;
        // clear if one dissapeared
        const paries = {};
        for (const pari of context.paris)
            paries[pari.position] = pari;
        if (!paries['POS'])
            this.clear('gradientPos');
        if (!paries['NEG'])
            this.clear('gradientNeg');
        const anim = {
            high: {
                lable: 'high',
                pixi: {
                    height: height * 0.9,
                    alpha: 0.3,
                },
                duration: 0.5,
                ease: 'back.inOut(2)',
            },
            low: {
                lable: 'low',
                pixi: {
                    height: height * 0.4,
                    alpha: 0.15,
                },
                duration: 0.5,
                ease: 'back.inOut(2)',
            },
            settle: {
                lable: 'settle',
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
                if (pari.position === context.pool.resolution) {
                    if (statepos.new) {
                        gradientPos.alpha = anim.high.pixi.alpha;
                        gradientPos.height = anim.high.pixi.height;
                    }
                    if (context.pool.settling) {
                        if (statepos.animation !== anim.settle.lable) {
                            statepos.animation = anim.settle.lable;
                            pixi_1.gsap.to(gradientPos, anim.settle);
                        }
                    }
                    else {
                        if (statepos.animation !== anim.high.lable) {
                            statepos.animation = anim.high.lable;
                            pixi_1.gsap.to(gradientPos, anim.high);
                        }
                    }
                }
                else {
                    if (statepos.new) {
                        gradientPos.alpha = anim.low.pixi.alpha;
                        gradientPos.height = anim.low.pixi.height;
                    }
                    if (statepos.animation !== anim.low.lable) {
                        statepos.animation = anim.low.lable;
                        pixi_1.gsap.to(gradientPos, anim.low);
                    }
                }
            }
            if (pari.position === 'NEG') {
                const [gradientNeg, stateneg] = this.get('gradientNeg', () => new pixi_1.Sprite(context.textures.get(__2.DOWN_WAGET_TEXTURE)));
                if (stateneg.new)
                    container.addChild(gradientNeg);
                gradientNeg.position.set(ox, y);
                gradientNeg.width = rx - ox;
                if (pari.position === context.pool.resolution) {
                    if (stateneg.new) {
                        gradientNeg.alpha = anim.high.pixi.alpha;
                        gradientNeg.height = anim.high.pixi.height;
                    }
                    if (context.pool.settling) {
                        if (stateneg.animation !== anim.settle.lable) {
                            stateneg.animation = anim.settle.lable;
                            pixi_1.gsap.to(gradientNeg, anim.settle);
                        }
                    }
                    else {
                        if (stateneg.animation !== anim.high.lable) {
                            stateneg.animation = anim.high.lable;
                            pixi_1.gsap.to(gradientNeg, anim.high);
                        }
                    }
                }
                else {
                    if (stateneg.new) {
                        gradientNeg.alpha = anim.low.pixi.alpha;
                        gradientNeg.height = anim.low.pixi.height;
                    }
                    if (stateneg.animation !== anim.low.lable) {
                        stateneg.animation = anim.low.lable;
                        pixi_1.gsap.to(gradientNeg, anim.low);
                    }
                }
            }
        }
        return container;
    }
}
exports.PariResolutionBackground = PariResolutionBackground;
PariResolutionBackground.PARI_RESOLUTION_ID = Symbol('PARI_RESOLUTION_ID');
//# sourceMappingURL=PariResolutionBackground.js.map