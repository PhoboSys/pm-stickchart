"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolResolutionPriceTag = void 0;
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
const index_1 = __importDefault(require("../../../lib/ui/index"));
const BasePoolsRenderer_1 = require("./BasePoolsRenderer");
class PoolResolutionPriceTag extends BasePoolsRenderer_1.BasePoolsRenderer {
    constructor() {
        super(...arguments);
        this.textStyle = {
            fill: 0xFFFFFF,
            fontWeight: 600,
            fontFamily: 'Gilroy',
            fontSize: 13,
        };
        this.coverStyle = {
            paddingx: 8,
            paddingy: 5,
            paddingRight: 10,
            radius: 30,
            color: 0x22273F,
            lineStyle: {
                color: 0xFFFFFF,
                width: 2,
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
                delay: 0.2,
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
        if (this.isActualPool(pool))
            return this.clear();
        const resolution = this.getResolutionPricePoint(pool, context);
        if (!resolution)
            return this.clear();
        this.updateResolutionPriceTag(pool, context, container, resolution);
    }
    updateResolutionPriceTag(pool, context, container, resolution) {
        const { timerange, pricerange, } = context.plotdata;
        const { width, height, } = context.screen;
        const [x] = datamath_1.default.scale([resolution.timestamp], timerange, width);
        const [y] = datamath_1.default.scaleReverse([resolution.price], pricerange, height);
        const priceValue = index_1.default.currency(resolution.price, context.metapool.quote);
        const [cover, coverState] = this.get('cover', () => this.createPriceText(priceValue));
        if (coverState.new)
            container.addChild(cover);
        const textGraphic = cover.getChildAt(1);
        textGraphic.text = priceValue;
        const { paddingx, paddingy } = this.coverStyle;
        const coverGraphic = cover.getChildAt(0);
        const coverWidth = textGraphic.width + paddingx * 2;
        const coverHeight = textGraphic.height + paddingy * 2;
        coverGraphic.width = coverWidth;
        coverGraphic.height = coverHeight;
        coverGraphic.position.x = -coverWidth;
        textGraphic.position.x = -coverWidth + paddingx;
        cover.position.set(x + coverWidth + this.coverStyle.paddingRight, y);
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
    createPriceText(priceValue) {
        const { paddingx, paddingy } = this.coverStyle;
        const text = new pixi_1.Text(priceValue, this.textStyle);
        text.position.set(paddingx, paddingy);
        const width = text.width + paddingx * 2;
        const height = text.height + paddingy * 2;
        const { radius, color } = this.coverStyle;
        const cover = new pixi_1.Graphics()
            .beginFill(color)
            .lineStyle(this.coverStyle.lineStyle)
            .drawRoundedRect(0, 0, width, height, radius)
            .endFill();
        text.position.x = -width + paddingx;
        cover.position.x = -width;
        text.position.y = -height / 2 + paddingy;
        cover.position.y = -height / 2;
        const coveredText = new pixi_1.Container();
        coveredText.addChild(cover, text);
        return coveredText;
    }
}
exports.PoolResolutionPriceTag = PoolResolutionPriceTag;
PoolResolutionPriceTag.POOL_RESOLUTION_PRICE_TAG_ID = Symbol('POOL_RESOLUTION_PRICE_TAG_ID');
//# sourceMappingURL=PoolResolutionPriceTag.js.map