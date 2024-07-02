"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoundResolutionPriceTag = void 0;
const _rendering_1 = require("../../index.js");
const _enums_1 = require("../../../enums/index.js");
const _config_1 = __importDefault(require("../../../config.js"));
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const index_1 = __importDefault(require("../../../lib/ui/index"));
const BaseRoundsRenderer_1 = require("./BaseRoundsRenderer");
class RoundResolutionPriceTag extends BaseRoundsRenderer_1.BaseRoundsRenderer {
    constructor() {
        super(...arguments);
        this.baseCoverStyle = {
            color: 0xFFFFFF,
            offset: [14, -14],
            anchor: [0, 0],
            padding: [6, 8],
            radius: 16,
            textstyle: {
                fill: 0xFFFFFF,
                fontWeight: 500,
                fontFamily: 'Roboto',
                fontSize: 12,
            }
        };
        this.coverStyle = {
            [_enums_1.EPosition.Undefined]: Object.assign(Object.assign({}, this.baseCoverStyle), { color: _config_1.default.style.linearresolution.nocontest, textstyle: Object.assign(Object.assign({}, this.baseCoverStyle.textstyle), { fill: 0x071226 }) }),
            [_enums_1.EPosition.Up]: Object.assign(Object.assign({}, this.baseCoverStyle), { color: _config_1.default.style.linearresolution.upcolor }),
            [_enums_1.EPosition.Down]: Object.assign(Object.assign({}, this.baseCoverStyle), { color: _config_1.default.style.linearresolution.downcolor }),
            [_enums_1.EPosition.Zero]: Object.assign(Object.assign({}, this.baseCoverStyle), { color: _config_1.default.style.linearresolution.zerocolor, textstyle: Object.assign(Object.assign({}, this.baseCoverStyle.textstyle), { fill: 0x071226 }) }),
            [_enums_1.EPosition.NoContest]: Object.assign(Object.assign({}, this.baseCoverStyle), { color: _config_1.default.style.linearresolution.nocontest, textstyle: Object.assign(Object.assign({}, this.baseCoverStyle.textstyle), { fill: 0x071226 }) })
        };
        this.configAnimations = {
            fadein: {
                pixi: {
                    alpha: 1,
                },
                duration: 0.5,
                ease: 'power2.out',
                clear: true,
            },
            fadeout: {
                pixi: {
                    alpha: 0,
                },
                duration: 0.3,
                ease: 'power2.out',
                delay: 0.1,
            }
        };
    }
    get animations() {
        return this.configAnimations;
    }
    get rendererId() {
        return RoundResolutionPriceTag.ROUND_RESOLUTION_PRICE_TAG_ID;
    }
    updateRound(round, context, container) {
        if (!round.openPriceTimestamp || !round.openPriceValue || this.isActualRound(round, context))
            return this.clear();
        const rprice = this.getResolutionPricePoint(round, context);
        if (!rprice)
            return this.clear();
        this.updateResolutionPriceTag(round, context, container, rprice);
    }
    updateResolutionPriceTag(round, context, container, rprice) {
        const { timerange, pricerange, } = context.plotdata;
        const { width, height, } = context.screen;
        const [x] = datamath_1.default.scale([rprice.timestamp], timerange, width);
        const [y] = datamath_1.default.scaleReverse([Number(rprice.value)], pricerange, height);
        const priceValue = index_1.default.currency(rprice.value, context.game.quote);
        const position = this.getRoundResolution(round, context);
        const coverStyle = this.coverStyle[position];
        const [cover, coverState] = this.get('cover', () => _rendering_1.GraphicUtils.createCoveredText(priceValue, coverStyle.offset, Object.assign(Object.assign({}, coverStyle), { color: 0xFFFFFF })));
        const [ofx, ofy] = coverStyle.offset;
        if (coverState.new)
            container.addChild(cover);
        else
            cover.update((textGraphic, coverGraphic) => {
                textGraphic.text = priceValue;
                textGraphic.style.fill = coverStyle.textstyle.fill;
                coverGraphic.tint = coverStyle.color;
            }, [x + ofx, y + ofy], coverStyle);
        if (this.isHistoricalRound(round, context)) {
            const roundid = round.roundid;
            if (!coverState.subscribed) {
                coverState.subscribed = true;
                context.eventTarget.addEventListener('roundpin', (e) => {
                    if (e.roundid !== roundid)
                        return;
                    this.rebind(roundid);
                    this.animate('cover', 'fadein');
                });
                context.eventTarget.addEventListener('roundunpin', (e) => {
                    if (e.roundid !== roundid)
                        return;
                    this.rebind(roundid);
                    this.animate('cover', 'fadeout');
                });
            }
            if (coverState.new) {
                cover.alpha = 0;
            }
            else if (coverState.animation !== 'fadein') {
                this.animate('cover', 'fadeout');
            }
        }
    }
}
exports.RoundResolutionPriceTag = RoundResolutionPriceTag;
RoundResolutionPriceTag.ROUND_RESOLUTION_PRICE_TAG_ID = Symbol('ROUND_RESOLUTION_PRICE_TAG_ID');
//# sourceMappingURL=RoundResolutionPriceTag.js.map