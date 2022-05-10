"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PariResolvedRenderer = void 0;
const pixi_1 = require("../../../../lib/pixi");
const datamath_1 = __importDefault(require("../../../../lib/datamath"));
const __1 = require("../../..");
class PariResolvedRenderer extends __1.BaseRenderer {
    constructor(renderer) {
        super(renderer);
        this.unresolvedParis = {};
        this.textstyle = {
            fill: 0xFFFFFF,
            fontWeight: 600,
            fontFamily: 'Gilroy',
            fontSize: 18,
        };
        this.subtextstyle = {
            fill: 0xFFFFFF,
            fontWeight: 400,
            fontFamily: 'Gilroy',
            fontSize: 18,
        };
        this.textstylePrecent = {
            fill: 0xFFFFFF,
            fontWeight: 300,
            fontFamily: 'Gilroy',
            fontSize: 15,
        };
    }
    get rendererId() {
        return PariResolvedRenderer.PARI_RESOLVED_ID;
    }
    update(context, container) {
        var _a, _b, _c, _d;
        if (!context.pool ||
            !((_a = context.paris) === null || _a === void 0 ? void 0 : _a.length) && !((_b = context.resolved) === null || _b === void 0 ? void 0 : _b.length)) {
            this.clear();
            return container;
        }
        // clear if pool changed
        if (this.renderedMetaId !== context.pool.metaid) {
            this.clear();
            this.renderedMetaId = context.pool.metaid;
            this.unresolvedParis = {};
        }
        // create Paris for render
        const paris = {};
        const resolvedPari1 = context.resolved.at(0);
        if (resolvedPari1 && ((_c = this.unresolvedParis[resolvedPari1.position]) === null || _c === void 0 ? void 0 : _c.id) === resolvedPari1.id) {
            paris[resolvedPari1.position] = resolvedPari1;
        }
        const resolvedPari2 = context.resolved.at(1);
        if (resolvedPari2 && ((_d = this.unresolvedParis[resolvedPari2.position]) === null || _d === void 0 ? void 0 : _d.id) === resolvedPari2.id) {
            paris[resolvedPari2.position] = resolvedPari2;
        }
        // update unresolved paris
        for (const pari of context.paris) {
            this.unresolvedParis[pari.position] = pari;
        }
        const anim = {
            win: {
                pixi: {
                    positionY: '-=100',
                    scale: 1.5,
                    alpha: -0.3,
                },
                ease: 'power2.out',
                duration: 12,
            },
            lose: {
                pixi: {
                    positionY: '-=100',
                    scale: 1.5,
                    alpha: -1,
                },
                ease: 'power2.out',
                duration: 12,
            },
        };
        // loop
        const { width, height } = context.screen;
        const { timerange, pricerange } = context.plotdata;
        for (const position in paris) {
            const pari = paris[position];
            const [x] = datamath_1.default.scale([pari.resolutionDate], timerange, width);
            const [y] = datamath_1.default.scaleReverse([pari.openPrice.value], pricerange, height);
            const gap = 6;
            const xpad = 8;
            const prize = datamath_1.default.returnPrize({
                wager: pari.wager,
                position: pari.position,
                resolution: pari.resolution,
                positiveFund: pari.positiveFund,
                negativeFund: pari.negativeFund,
                precision: 5
            });
            const percent = datamath_1.default.profitPercent(prize, pari.wager, 2);
            const isWinning = prize !== 0;
            if (pari.position === 'POS') {
                const [prizePos, prizePosState] = this.get('prizePos', () => new pixi_1.Container());
                if (prizePosState.new)
                    container.addChild(prizePos);
                if (prizePosState.animation !== 'POS') {
                    prizePosState.animation = 'POS';
                    prizePos.position.set(x, y);
                    this.unresolvedParis = {};
                    if (isWinning) {
                        prizePosState.timeline = pixi_1.gsap.to(prizePos, Object.assign(Object.assign({}, anim.win), { onComplete: () => {
                                this.clear('prizePos');
                                this.clear('dividendsPos');
                                this.clear('dividendsCurPos');
                                this.clear('dividendsPerPos');
                            } }));
                    }
                    else {
                        prizePosState.timeline = pixi_1.gsap.to(prizePos, Object.assign(Object.assign({}, anim.lose), { onComplete: () => {
                                this.clear('prizePos');
                                this.clear('dividendsPos');
                                this.clear('dividendsCurPos');
                                this.clear('dividendsPerPos');
                            } }));
                    }
                }
                const [dividendsPos, dividendsPosState] = this.get('dividendsPos', () => __1.GraphicUtils.createText(prize, [0, 0], this.textstyle, [0, 1.25]));
                if (dividendsPosState.new)
                    prizePos.addChild(dividendsPos);
                dividendsPos.position.set(xpad, 0);
                dividendsPos.text = String(prize);
                const [dividendsCurPos, dividendsCurPosState] = this.get('dividendsCurPos', () => __1.GraphicUtils.createText(pari.currency, [0, 0], this.subtextstyle, [0, 1.25]));
                if (dividendsCurPosState.new)
                    prizePos.addChild(dividendsCurPos);
                dividendsCurPos.position.set(xpad + dividendsPos.width + gap, 0);
                const [dividendsPerPos, dividendsPerPosState] = this.get('dividendsPerPos', () => __1.GraphicUtils.createText(percent + '%', [0, 0], this.textstylePrecent, [0, 1.25]));
                if (dividendsPerPosState.new)
                    prizePos.addChild(dividendsPerPos);
                dividendsPerPos.position.set(xpad, -dividendsPos.height);
                dividendsPerPos.text = percent + '%';
                dividendsPos.alpha = 5;
                dividendsCurPos.alpha = 5;
                if (isWinning) {
                    dividendsPos.style.fill = 0x00A573;
                    dividendsCurPos.style.fill = 0x00A573;
                    dividendsPerPos.alpha = 5;
                }
                else {
                    dividendsPos.style.fill = 0xF05350;
                    dividendsCurPos.style.fill = 0xF05350;
                    dividendsPerPos.alpha = 0;
                }
            }
            if (pari.position === 'NEG') {
                const [prizeNeg, prizeNegState] = this.get('prizeNeg', () => new pixi_1.Container());
                if (prizeNegState.new)
                    container.addChild(prizeNeg);
                if (prizeNegState.animation !== 'NEG') {
                    prizeNegState.animation = 'NEG';
                    prizeNeg.position.set(x, y);
                    this.unresolvedParis = {};
                    if (isWinning) {
                        prizeNegState.timeline = pixi_1.gsap.to(prizeNeg, Object.assign(Object.assign({}, anim.win), { onComplete: () => {
                                this.clear('prizeNeg');
                                this.clear('dividendsNeg');
                                this.clear('dividendsCurNeg');
                                this.clear('dividendsPerNeg');
                            } }));
                    }
                    else {
                        prizeNegState.timeline = pixi_1.gsap.to(prizeNeg, Object.assign(Object.assign({}, anim.lose), { onComplete: () => {
                                this.clear('prizeNeg');
                                this.clear('dividendsNeg');
                                this.clear('dividendsCurNeg');
                                this.clear('dividendsPerNeg');
                            } }));
                    }
                }
                const [dividendsNeg, dividendsNegState] = this.get('dividendsNeg', () => __1.GraphicUtils.createText(prize, [0, 0], this.textstyle, [0, -0.3]));
                if (dividendsNegState.new)
                    prizeNeg.addChild(dividendsNeg);
                dividendsNeg.position.set(xpad, 0);
                dividendsNeg.text = String(prize);
                const [dividendsCurNeg, dividendsCurNegState] = this.get('dividendsCurNeg', () => __1.GraphicUtils.createText('ETH', [0, 0], this.subtextstyle, [0, -0.3]));
                if (dividendsCurNegState.new)
                    prizeNeg.addChild(dividendsCurNeg);
                dividendsCurNeg.position.set(xpad + dividendsNeg.width + gap, 0);
                const [dividendsPerNeg, dividendsPerNegState] = this.get('dividendsPerNeg', () => __1.GraphicUtils.createText(percent + '%', [0, 0], this.textstylePrecent, [0, -0.3]));
                if (dividendsPerNegState.new)
                    prizeNeg.addChild(dividendsPerNeg);
                dividendsPerNeg.position.set(xpad, dividendsNeg.height);
                dividendsPerNeg.text = percent + '%';
                dividendsNeg.alpha = 5;
                dividendsCurNeg.alpha = 5;
                if (isWinning) {
                    dividendsNeg.style.fill = 0x00A573;
                    dividendsCurNeg.style.fill = 0x00A573;
                    dividendsPerNeg.alpha = 5;
                }
                else {
                    dividendsNeg.style.fill = 0xF05350;
                    dividendsCurNeg.style.fill = 0xF05350;
                    dividendsPerNeg.alpha = 0;
                }
            }
        }
        return container;
    }
}
exports.PariResolvedRenderer = PariResolvedRenderer;
PariResolvedRenderer.PARI_RESOLVED_ID = Symbol('PARI_RESOLVED_ID');
//# sourceMappingURL=PariResolvedRenderer.js.map