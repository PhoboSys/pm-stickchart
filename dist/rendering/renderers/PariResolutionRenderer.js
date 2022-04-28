"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PariResolutionRenderer = void 0;
const pixi_1 = require("../../lib/pixi");
const datamath_1 = __importDefault(require("../../lib/datamath"));
const __1 = require("..");
const __2 = require("..");
class PariResolutionRenderer extends __1.BaseRenderer {
    constructor(renderer) {
        super(renderer);
        this.wagerUp = {
            linestyle: {
                width: 1,
                color: 0xFFFFFF,
                alpha: 1,
            },
            textstyle: {
                fill: 0x00A573,
                fontWeight: 600,
                fontFamily: 'Gilroy',
                fontSize: 29,
            },
            outerPoint: {
                color: 0x00A573,
                radius: 6
            },
            innerPoint: {
                color: 0xFFFFFF,
                radius: 3
            },
        };
        this.wagerDown = {
            linestyle: {
                width: 1,
                color: 0xFFFFFF,
                alpha: 1,
            },
            textstyle: {
                fill: 0xD64E48,
                fontWeight: 600,
                fontFamily: 'Gilroy',
                fontSize: 29,
            },
            outerPoint: {
                color: 0xD64E48,
                radius: 6
            },
            innerPoint: {
                color: 0xFFFFFF,
                radius: 3
            },
        };
    }
    get rendererId() {
        return PariResolutionRenderer.PARI_RESOLUTION_ID;
    }
    update(context, container) {
        var _a;
        if (!context.pool)
            return new pixi_1.Container();
        if (!context.pool.openPrice)
            return new pixi_1.Container();
        if (!((_a = context.paris) === null || _a === void 0 ? void 0 : _a.length))
            return new pixi_1.Container();
        const { openDate, resolutionDate, openPrice } = context.pool;
        const { width, height } = context.screen;
        const { xrange, yrange, ylast } = context.plotdata;
        const [ox, rx] = datamath_1.default.scale([openDate, resolutionDate], xrange, width);
        const [yr] = datamath_1.default.scale([openPrice.value], yrange, height);
        const y = height - yr;
        for (const pari of context.paris) {
            if (pari.position === 'POS') {
                const [gradientpos, statepos] = this.get('gradientpos', () => new pixi_1.Sprite(context.textures.get(__2.UP_WAGET_TEXTURE)));
                if (statepos.new)
                    container.addChild(gradientpos);
                gradientpos.position.set(ox, y);
                gradientpos.width = rx - ox;
                if (statepos.new) {
                    gradientpos.height = height * 0.3;
                    gradientpos.alpha = 0;
                    // flip
                    gradientpos.scale.y *= -1;
                }
                if (ylast > context.pool.openPrice.value) {
                    if (statepos.animation !== 'hight') {
                        statepos.animation = 'hight';
                        pixi_1.gsap.to(gradientpos, {
                            pixi: {
                                alpha: 0.3,
                                height: height * 0.6,
                            },
                            duration: 0.5
                        });
                    }
                }
                else {
                    if (statepos.animation !== 'low') {
                        statepos.animation = 'low';
                        pixi_1.gsap.to(gradientpos, {
                            pixi: {
                                alpha: 0.15,
                                height: height * 0.3,
                            },
                            duration: 0.5
                        });
                    }
                }
            }
            if (pari.position === 'NEG') {
                const [gradientneg, stateneg] = this.get('gradientneg', () => new pixi_1.Sprite(context.textures.get(__2.DOWN_WAGET_TEXTURE)));
                if (stateneg.new)
                    container.addChild(gradientneg);
                gradientneg.position.set(ox, y);
                gradientneg.width = rx - ox;
                if (stateneg.new) {
                    gradientneg.height = height * 0.3;
                    gradientneg.alpha = 0;
                }
                if (ylast < context.pool.openPrice.value) {
                    if (stateneg.animation !== 'hight') {
                        stateneg.animation = 'hight';
                        pixi_1.gsap.to(gradientneg, {
                            pixi: {
                                alpha: 0.3,
                                height: height * 0.6,
                            },
                            duration: 0.5
                        });
                    }
                }
                else {
                    if (stateneg.animation !== 'low') {
                        stateneg.animation = 'low';
                        pixi_1.gsap.to(gradientneg, {
                            pixi: {
                                alpha: 0.15,
                                height: height * 0.3,
                            },
                            duration: 0.5
                        });
                    }
                }
            }
        }
        return container;
    }
}
exports.PariResolutionRenderer = PariResolutionRenderer;
PariResolutionRenderer.PARI_RESOLUTION_ID = Symbol('PARI_RESOLUTION_ID');
//# sourceMappingURL=PariResolutionRenderer.js.map