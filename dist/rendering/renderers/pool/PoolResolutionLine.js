"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolResolutionLine = void 0;
const _config_1 = __importDefault(require("../../../config.js"));
const _rendering_1 = require("../../index.js");
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const _enums_1 = require("../../../enums/index.js");
const pixi_1 = require("../../../lib/pixi");
const BasePoolsRenderer_1 = require("./BasePoolsRenderer");
class PoolResolutionLine extends BasePoolsRenderer_1.BasePoolsRenderer {
    constructor() {
        super(...arguments);
        this.torusStyle = {
            [_enums_1.EPosition.Undefined]: {
                innerr: 3,
                outerr: 6,
                innerColor: 0x303550,
                outerColor: 0xFFFFFF,
            },
            [_enums_1.EPosition.Up]: {
                innerr: 3,
                outerr: 6,
                innerColor: 0x303550,
                outerColor: _config_1.default.style.resolution.upcolor,
            },
            [_enums_1.EPosition.Down]: {
                innerr: 3,
                outerr: 6,
                innerColor: 0x303550,
                outerColor: _config_1.default.style.resolution.downcolor,
            },
            [_enums_1.EPosition.Zero]: {
                innerr: 3,
                outerr: 6,
                innerColor: 0x303550,
                outerColor: _config_1.default.style.resolution.zerocolor,
            }
        };
        this.lineStyle = {
            [_enums_1.EPosition.Undefined]: {
                color: 0xFFFFFF,
                width: 3,
                alpha: 0.9,
            },
            [_enums_1.EPosition.Up]: {
                color: _config_1.default.style.resolution.upcolor,
                width: 3,
                alpha: 1,
            },
            [_enums_1.EPosition.Down]: {
                color: _config_1.default.style.resolution.downcolor,
                width: 3,
                alpha: 1,
            },
            [_enums_1.EPosition.Zero]: {
                color: _config_1.default.style.resolution.zerocolor,
                width: 3,
                alpha: 1,
            },
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
                    alpha: 0.7,
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
        return PoolResolutionLine.POOL_RESOLUTION_LINE_ID;
    }
    updatePool(pool, context, container) {
        if (!pool.openPriceTimestamp || !pool.openPriceValue)
            return this.clear();
        const resolution = this.getResolutionPricePoint(pool, context);
        if (!resolution)
            return this.clear();
        this.updateResolutionLine(pool, context, container, resolution);
    }
    updateResolutionLine(pool, context, container, resolution) {
        const { timerange, pricerange, } = context.plotdata;
        const { width, height, } = context.screen;
        const [x1, x2] = datamath_1.default.scale([pool.openPriceTimestamp, resolution.timestamp], timerange, width);
        const [y1, y2] = datamath_1.default.scaleReverse([pool.openPriceValue, resolution.value], pricerange, height);
        const [group, groupstate] = this.get('group', () => new pixi_1.Graphics());
        if (groupstate.new)
            container.addChild(group);
        const [line, linestate] = this.get('line', () => new pixi_1.Graphics());
        if (linestate.new)
            group.addChild(line);
        const position = this.getPoolResolutionByPrice(pool, resolution);
        line
            .clear()
            .lineStyle(this.lineStyle[position])
            .moveTo(x1, y1)
            .lineTo(x2, y2);
        const [openpoint, openpointstate] = this.get('openpoint', () => this.createPricePoint(pool, context, this.torusStyle[position]), [position]);
        if (openpointstate.new)
            group.addChild(openpoint);
        openpoint.position.set(x1, y1);
        const [respoint, respointstate] = this.get('respoint', () => this.createPricePoint(pool, context, this.torusStyle[position]), [position]);
        if (respointstate.new)
            group.addChild(respoint);
        respoint.position.set(x2, y2);
        if (this.isHistoricalPool(pool, context)) {
            const poolid = pool.poolid;
            if (!groupstate.subscribed) {
                groupstate.subscribed = true;
                context.eventTarget.addEventListener('poolhover', (e) => {
                    if (e.poolid !== poolid)
                        return;
                    this.rebind(poolid);
                    this.animate('group', 'fadein');
                });
                context.eventTarget.addEventListener('poolunhover', (e) => {
                    if (e.poolid !== poolid)
                        return;
                    this.rebind(poolid);
                    this.animate('group', 'fadeout');
                });
            }
            if (groupstate.new) {
                group.alpha = 0.7;
            }
            else if (groupstate.animation !== 'fadein') {
                this.animate('group', 'fadeout');
            }
        }
    }
    createPricePoint(pool, context, style) {
        const inner = _rendering_1.GraphicUtils.createCircle([0, 0], style.innerr, { color: style.innerColor });
        const outer = _rendering_1.GraphicUtils.createCircle([0, 0], style.outerr, { color: style.outerColor });
        const pointer = new pixi_1.Container();
        pointer.addChild(outer, inner);
        return pointer;
    }
}
exports.PoolResolutionLine = PoolResolutionLine;
PoolResolutionLine.POOL_RESOLUTION_LINE_ID = Symbol('POOL_RESOLUTION_LINE_ID');
//# sourceMappingURL=PoolResolutionLine.js.map