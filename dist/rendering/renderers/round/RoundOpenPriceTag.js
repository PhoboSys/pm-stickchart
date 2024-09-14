"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoundOpenPriceTag = void 0;
const _rendering_1 = require("../../index.js");
const _config_1 = __importDefault(require("../../../config.js"));
const _enums_1 = require("../../../enums/index.js");
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const index_1 = __importDefault(require("../../../lib/ui/index"));
const BaseRoundsRenderer_1 = require("./BaseRoundsRenderer");
class RoundOpenPriceTag extends BaseRoundsRenderer_1.BaseRoundsRenderer {
    constructor() {
        super(...arguments);
        this.baseCoverStyle = {
            color: 0xFFFFFF,
            offset: [-14, -14],
            anchor: [1, 0],
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
    get rendererId() {
        return RoundOpenPriceTag.ROUND_OPEN_PRICE_TAG_ID;
    }
    get animations() {
        return this.configAnimations;
    }
    updateRound(round, context, container) {
        if (!round.entryPriceTimestamp || !round.entryPriceValue)
            return this.clear();
        this.updateOpenPriceTag(round, context, container);
    }
    updateOpenPriceTag(round, context, container) {
        const { timerange, pricerange, } = context.plotdata;
        const { width, height, } = context.screen;
        const [x] = datamath_1.default.scale([round.entryPriceTimestamp], timerange, width);
        const [y] = datamath_1.default.scaleReverse([round.entryPriceValue], pricerange, height);
        const position = this.getRoundResolution(round, context);
        const coverStyle = this.coverStyle[position];
        const [cover, coverState] = this.get('cover', () => _rendering_1.GraphicUtils.createCoveredText(index_1.default.currency(round.entryPriceValue, context.game.quote), coverStyle.offset, Object.assign(Object.assign({}, coverStyle), { color: 0xFFFFFF })));
        const [ofx, ofy] = coverStyle.offset;
        if (coverState.new)
            container.addChild(cover);
        else
            cover.update((textGraphic, coverGraphic) => {
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
exports.RoundOpenPriceTag = RoundOpenPriceTag;
RoundOpenPriceTag.ROUND_OPEN_PRICE_TAG_ID = Symbol('ROUND_OPEN_PRICE_TAG_ID');
//# sourceMappingURL=RoundOpenPriceTag.js.map