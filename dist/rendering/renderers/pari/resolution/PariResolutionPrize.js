"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PariResolutionPrize = void 0;
const datamath_1 = __importDefault(require("../../../../lib/datamath"));
const __1 = require("../../..");
class PariResolutionPrize extends __1.BaseRenderer {
    constructor(renderer) {
        super(renderer);
        this.textstyle = {
            fill: 0xFFFFFF,
            fontWeight: 600,
            fontFamily: 'Gilroy',
            fontSize: 18,
        };
        this.textstylePrecent = {
            fill: 0xFFFFFF,
            fontWeight: 300,
            fontFamily: 'Gilroy',
            fontSize: 15,
        };
        this.subtextstyle = {
            fill: 0xFFFFFF,
            fontWeight: 400,
            fontFamily: 'Gilroy',
            fontSize: 18,
        };
    }
    get rendererId() {
        return PariResolutionPrize.PARI_RESOLUTION_PRIZE_ID;
    }
    update(context, container) {
        var _a;
        if (!context.pool ||
            !context.pool.openPrice ||
            !((_a = context.paris) === null || _a === void 0 ? void 0 : _a.length)) {
            this.clear();
            return container;
        }
        // clear if pool changed
        if (this.renderedMetaId && this.renderedMetaId !== context.pool.metaid) {
            this.clear();
        }
        this.renderedMetaId = context.pool.metaid;
        const { resolutionDate, openPrice } = context.pool;
        const { width, height } = context.screen;
        const { timerange, pricerange } = context.plotdata;
        const [x] = datamath_1.default.scale([resolutionDate], timerange, width);
        const [yr] = datamath_1.default.scale([openPrice.value], pricerange, height);
        const y = height - yr;
        const gap = 6;
        const xpad = 8;
        // clear
        const paris = {};
        for (const pari of context.paris)
            paris[pari.position] = pari;
        if (!paris['POS']) {
            this.clear('dividendsPos');
            this.clear('dividendsCurPos');
            this.clear('dividendsPerPos');
        }
        if (!paris['NEG']) {
            this.clear('dividendsNeg');
            this.clear('dividendsCurNeg');
            this.clear('dividendsPerNeg');
        }
        // loop
        const { pool } = context;
        for (const pari of context.paris) {
            const prize = datamath_1.default.returnPrize({
                wager: pari.wager,
                position: pari.position,
                resolution: pool.resolution,
                positiveFund: pool.positiveFund,
                negativeFund: pool.negativeFund,
                precision: 5
            });
            const percent = datamath_1.default.profitPercent(prize, pari.wager, 2);
            const isWinning = prize !== 0;
            if (pari.position === 'POS') {
                const [dividendsPos, dividendsPosState] = this.get('dividendsPos', () => __1.GraphicUtils.createText(prize, [x, y], this.textstyle, [0, 1.25]));
                if (dividendsPosState.new)
                    container.addChild(dividendsPos);
                dividendsPos.position.set(x + xpad, y);
                dividendsPos.text = String(prize);
                const [dividendsCurPos, dividendsCurPosState] = this.get('dividendsCurPos', () => __1.GraphicUtils.createText(pari.currency, [x, y], this.subtextstyle, [0, 1.25]));
                if (dividendsCurPosState.new)
                    container.addChild(dividendsCurPos);
                dividendsCurPos.position.set(x + xpad + dividendsPos.width + gap, y);
                const [dividendsPerPos, dividendsPerPosState] = this.get('dividendsPerPos', () => __1.GraphicUtils.createText(percent + '%', [x, y], this.textstylePrecent, [0, 1.25]));
                if (dividendsPerPosState.new)
                    container.addChild(dividendsPerPos);
                dividendsPerPos.position.set(x + xpad, y - dividendsPos.height);
                dividendsPerPos.text = percent + '%';
                if (isWinning) {
                    dividendsPos.style.fill = 0x00A573;
                    dividendsCurPos.style.fill = 0x00A573;
                    dividendsPerPos.alpha = 1;
                }
                else {
                    dividendsPos.style.fill = 0xF05350;
                    dividendsCurPos.style.fill = 0xF05350;
                    dividendsPerPos.alpha = 0;
                }
            }
            if (pari.position === 'NEG') {
                const [dividendsNeg, dividendsNegState] = this.get('dividendsNeg', () => __1.GraphicUtils.createText(prize, [x, y], this.textstyle, [0, -0.3]));
                if (dividendsNegState.new)
                    container.addChild(dividendsNeg);
                dividendsNeg.position.set(x + xpad, y);
                dividendsNeg.text = String(prize);
                const [dividendsCurNeg, dividendsCurNegState] = this.get('dividendsCurNeg', () => __1.GraphicUtils.createText('ETH', [x, y], this.subtextstyle, [0, -0.3]));
                if (dividendsCurNegState.new)
                    container.addChild(dividendsCurNeg);
                dividendsCurNeg.position.set(x + xpad + dividendsNeg.width + gap, y);
                const [dividendsPerNeg, dividendsPerNegState] = this.get('dividendsPerNeg', () => __1.GraphicUtils.createText(percent + '%', [x, y], this.textstylePrecent, [0, -0.3]));
                if (dividendsPerNegState.new)
                    container.addChild(dividendsPerNeg);
                dividendsPerNeg.position.set(x + xpad, y + dividendsNeg.height);
                dividendsPerNeg.text = percent + '%';
                if (isWinning) {
                    dividendsNeg.style.fill = 0x00A573;
                    dividendsCurNeg.style.fill = 0x00A573;
                    dividendsPerNeg.alpha = 1;
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
exports.PariResolutionPrize = PariResolutionPrize;
PariResolutionPrize.PARI_RESOLUTION_PRIZE_ID = Symbol('PARI_RESOLUTION_PRIZE_ID');
//# sourceMappingURL=PariResolutionPrize.js.map