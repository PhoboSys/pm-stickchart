"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolResolutionPriceTag = void 0;
const _rendering_1 = require("../../index.js");
const _enums_1 = require("../../../enums/index.js");
const _config_1 = __importDefault(require("../../../config.js"));
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const index_1 = __importDefault(require("../../../lib/ui/index"));
const BasePoolsRenderer_1 = require("./BasePoolsRenderer");
class PoolResolutionPriceTag extends BasePoolsRenderer_1.BasePoolsRenderer {
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
            [_enums_1.EPosition.Undefined]: Object.assign(Object.assign({}, this.baseCoverStyle), { color: 0x000000 }),
            [_enums_1.EPosition.Up]: Object.assign(Object.assign({}, this.baseCoverStyle), { color: _config_1.default.style.linearresolution.upcolor }),
            [_enums_1.EPosition.Down]: Object.assign(Object.assign({}, this.baseCoverStyle), { color: _config_1.default.style.linearresolution.downcolor }),
            [_enums_1.EPosition.Zero]: Object.assign(Object.assign({}, this.baseCoverStyle), { color: _config_1.default.style.linearresolution.zerocolor, textstyle: Object.assign(Object.assign({}, this.baseCoverStyle.textstyle), { fill: 0x071226 }) }),
            [_enums_1.EPosition.NoContest]: Object.assign(Object.assign({}, this.baseCoverStyle), { color: _config_1.default.style.linearresolution.nocontest })
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
        return PoolResolutionPriceTag.POOL_RESOLUTION_PRICE_TAG_ID;
    }
    updatePool(pool, context, container) {
        if (!pool.openPriceTimestamp || !pool.openPriceValue || this.isActualPool(pool))
            return this.clear();
        const rprice = this.getResolutionPricePoint(pool, context);
        if (!rprice)
            return this.clear();
        this.updateResolutionPriceTag(pool, context, container, rprice);
    }
    updateResolutionPriceTag(pool, context, container, rprice) {
        const { timerange, pricerange, } = context.plotdata;
        const { width, height, } = context.screen;
        const [x] = datamath_1.default.scale([rprice.timestamp], timerange, width);
        const [y] = datamath_1.default.scaleReverse([Number(rprice.value)], pricerange, height);
        const priceValue = index_1.default.currency(rprice.value, context.metapool.quote);
        const position = this.getPoolResolution(pool, context);
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
        if (this.isHistoricalPool(pool, context)) {
            const poolid = pool.poolid;
            if (!coverState.subscribed) {
                coverState.subscribed = true;
                context.eventTarget.addEventListener('poolhover', (e) => {
                    if (e.poolid !== poolid)
                        return;
                    this.rebind(poolid);
                    this.animate('cover', 'fadein');
                });
                context.eventTarget.addEventListener('poolunhover', (e) => {
                    if (e.poolid !== poolid)
                        return;
                    this.rebind(poolid);
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
exports.PoolResolutionPriceTag = PoolResolutionPriceTag;
PoolResolutionPriceTag.POOL_RESOLUTION_PRICE_TAG_ID = Symbol('POOL_RESOLUTION_PRICE_TAG_ID');
//# sourceMappingURL=PoolResolutionPriceTag.js.map