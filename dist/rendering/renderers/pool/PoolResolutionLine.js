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
                inner: 3,
                outer: 8,
                innerColor: 0xFFFFFF,
                outerColor: 0xFFFFFF,
                innerAlpha: 0,
                zIndex: 2,
            },
            [_enums_1.EPosition.Up]: {
                inner: 3,
                outer: 8,
                innerColor: _config_1.default.style.linearresolution.upcolor,
                outerColor: 0xFFFFFF,
                zIndex: 2,
            },
            [_enums_1.EPosition.Down]: {
                inner: 3,
                outer: 8,
                innerColor: _config_1.default.style.linearresolution.downcolor,
                outerColor: 0xFFFFFF,
                zIndex: 2,
            },
            [_enums_1.EPosition.Zero]: {
                inner: 3,
                outer: 8,
                innerColor: _config_1.default.style.linearresolution.zerocolor,
                outerColor: 0xFFFFFF,
                zIndex: 2,
            },
            [_enums_1.EPosition.NoContest]: {
                inner: 3,
                outer: 8,
                innerColor: _config_1.default.style.linearresolution.nocontest,
                outerColor: 0xFFFFFF,
                zIndex: 2,
            }
        };
        this.lineStyle = {
            [_enums_1.EPosition.Undefined]: {
                color: 0xFFFFFF,
                width: 5,
                alpha: 0.9,
                zIndex: 1,
            },
            [_enums_1.EPosition.Up]: {
                color: _config_1.default.style.linearresolution.upcolor,
                width: 5,
                alpha: 1,
                zIndex: 1,
            },
            [_enums_1.EPosition.Down]: {
                color: _config_1.default.style.linearresolution.downcolor,
                width: 5,
                alpha: 1,
                zIndex: 1,
            },
            [_enums_1.EPosition.Zero]: {
                color: _config_1.default.style.linearresolution.zerocolor,
                width: 5,
                alpha: 1,
                zIndex: 1,
            },
            [_enums_1.EPosition.NoContest]: {
                color: _config_1.default.style.linearresolution.nocontest,
                width: 5,
                alpha: 1,
                zIndex: 1,
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
        if (context.features.curvedResolutionLines || !pool.openPriceTimestamp || !pool.openPriceValue)
            return this.clear();
        const [group] = this.updateGroup(context, container, pool);
        const rprice = this.getResolutionPricePoint(pool, context);
        const resolution = this.getPoolResolution(pool, context);
        this.updateOpenPoint(context, group, resolution, pool);
        this.updateResPoint(context, group, resolution, rprice);
        this.updateResolutionLine(pool, context, group, resolution, rprice);
    }
    updateGroup(context, container, pool) {
        const [group, groupstate] = this.get('group', () => new pixi_1.Graphics());
        if (groupstate.new) {
            group.sortableChildren = true;
            container.addChild(group);
        }
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
        return [group, groupstate];
    }
    updateOpenPoint(context, container, resolution, pool) {
        const { timerange, pricerange } = context.plotdata;
        const { width, height } = context.screen;
        const [x] = datamath_1.default.scale([pool.openPriceTimestamp], timerange, width);
        const [y] = datamath_1.default.scaleReverse([pool.openPriceValue], pricerange, height);
        const [openpoint, openpointstate] = this.get('openpoint', () => this.createPricePoint(this.torusStyle[resolution]), [resolution]);
        if (openpointstate.new)
            container.addChild(openpoint);
        openpoint.position.set(x, y);
    }
    updateResPoint(context, container, resolution, rprice) {
        if (!rprice)
            return this.clear('respoint');
        const { timerange, pricerange } = context.plotdata;
        const { width, height } = context.screen;
        const [x] = datamath_1.default.scale([rprice.timestamp], timerange, width);
        const [y] = datamath_1.default.scaleReverse([Number(rprice.value)], pricerange, height);
        const [respoint, respointstate] = this.get('respoint', () => this.createPricePoint(this.torusStyle[resolution]), [resolution]);
        if (respointstate.new)
            container.addChild(respoint);
        respoint.position.set(x, y);
    }
    updateResolutionLine(pool, context, container, resolution, rprice) {
        if (!rprice)
            return this.clear('line');
        const { timerange, pricerange } = context.plotdata;
        const { width, height } = context.screen;
        const [x1, x2] = datamath_1.default.scale([pool.openPriceTimestamp, rprice.timestamp], timerange, width);
        const [y1, y2] = datamath_1.default.scaleReverse([pool.openPriceValue, Number(rprice.value)], pricerange, height);
        const style = this.lineStyle[resolution];
        const [line, linestate] = this.get('line', () => new pixi_1.Graphics());
        if (linestate.new) {
            container.addChild(line);
            line.zIndex = style.zIndex;
        }
        line
            .clear()
            .lineStyle(style)
            .moveTo(x1, y1)
            .lineTo(x2, y2);
    }
    createPricePoint(style) {
        const inner = _rendering_1.GraphicUtils.createCircle([0, 0], style.inner, { color: style.innerColor, alpha: style.innerAlpha });
        const outer = _rendering_1.GraphicUtils.createTorus([0, 0], [style.inner, style.outer], { color: style.outerColor });
        const pointer = new pixi_1.Container();
        pointer.zIndex = style.zIndex;
        pointer.addChild(outer, inner);
        return pointer;
    }
}
exports.PoolResolutionLine = PoolResolutionLine;
PoolResolutionLine.POOL_RESOLUTION_LINE_ID = Symbol('POOL_RESOLUTION_LINE_ID');
//# sourceMappingURL=PoolResolutionLine.js.map