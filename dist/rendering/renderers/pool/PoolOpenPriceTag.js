"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolOpenPriceTag = void 0;
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
const index_1 = __importDefault(require("../../../lib/ui/index"));
const BasePoolsRenderer_1 = require("./BasePoolsRenderer");
class PoolOpenPriceTag extends BasePoolsRenderer_1.BasePoolsRenderer {
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
        this.updateOpenPriceTag(pool, context, container, resolution);
    }
    updateOpenPriceTag(pool, context, container, resolution) {
        const { timerange, pricerange, } = context.plotdata;
        const { width, height, } = context.screen;
        const [x] = datamath_1.default.scale([pool.openPriceTimestamp], timerange, width);
        const [y] = datamath_1.default.scaleReverse([pool.openPriceValue], pricerange, height);
        const priceValue = index_1.default.currency(pool.openPriceValue, context.metapool.quote);
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
        cover.position.set(x - this.coverStyle.paddingRight, y);
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
exports.PoolOpenPriceTag = PoolOpenPriceTag;
PoolOpenPriceTag.POOL_OPEN_PRICE_TAG_ID = Symbol('POOL_OPEN_PRICE_TAG_ID');
//# sourceMappingURL=PoolOpenPriceTag.js.map