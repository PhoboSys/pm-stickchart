"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolOpenPriceTag = void 0;
const _rendering_1 = require("../../index.js");
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const index_1 = __importDefault(require("../../../lib/ui/index"));
const BasePoolsRenderer_1 = require("./BasePoolsRenderer");
class PoolOpenPriceTag extends BasePoolsRenderer_1.BasePoolsRenderer {
    constructor() {
        super(...arguments);
        this.coverStyle = {
            offset: [-10, -10],
            anchor: [1, 0],
            textStyle: {
                fill: 0xFFFFFF,
                fontWeight: 700,
                fontFamily: 'Gilroy',
                fontSize: 13,
            }
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
        return PoolOpenPriceTag.POOL_OPEN_PRICE_TAG_ID;
    }
    get animations() {
        return this.configAnimations;
    }
    updatePool(pool, context, container) {
        if (!pool.openPriceTimestamp || !pool.openPriceValue)
            return this.clear();
        const resolution = this.getResolutionPricePoint(pool, context);
        if (!resolution)
            return this.clear();
        this.updateOpenPriceTag(pool, context, container);
    }
    updateOpenPriceTag(pool, context, container) {
        const { timerange, pricerange, } = context.plotdata;
        const { width, height, } = context.screen;
        const [x] = datamath_1.default.scale([pool.openPriceTimestamp], timerange, width);
        const [y] = datamath_1.default.scaleReverse([pool.openPriceValue], pricerange, height);
        const priceValue = index_1.default.currency(pool.openPriceValue, context.metapool.quote);
        const [cover, coverState] = this.get('cover', () => _rendering_1.GraphicUtils.createText(priceValue, [0, 0], this.coverStyle.textStyle, this.coverStyle.anchor));
        if (coverState.new)
            container.addChild(cover);
        cover.text = priceValue;
        const [ofx, ofy] = this.coverStyle.offset;
        cover.position.set(x + ofx, y + ofy);
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
exports.PoolOpenPriceTag = PoolOpenPriceTag;
PoolOpenPriceTag.POOL_OPEN_PRICE_TAG_ID = Symbol('POOL_OPEN_PRICE_TAG_ID');
//# sourceMappingURL=PoolOpenPriceTag.js.map