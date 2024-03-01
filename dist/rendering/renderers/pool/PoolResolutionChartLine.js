"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolResolutionChartLine = void 0;
const _config_1 = __importDefault(require("../../../config.js"));
const _rendering_1 = require("../../index.js");
const _enums_1 = require("../../../enums/index.js");
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
const calc_utils_1 = require("../../../lib/calc-utils");
const BasePoolsRenderer_1 = require("./BasePoolsRenderer");
class PoolResolutionChartLine extends BasePoolsRenderer_1.BasePoolsRenderer {
    constructor() {
        super(...arguments);
        this.baseTorusStyle = {
            inner: 3,
            outer: 8,
            innerColor: 0xFFFFFF,
            outerColor: 0xFFFFFF,
            zIndex: 3,
        };
        this.torusStyle = {
            [_enums_1.EPosition.Undefined]: Object.assign(Object.assign({}, this.baseTorusStyle), { innerAlpha: 0 }),
            [_enums_1.EPosition.Up]: Object.assign(Object.assign({}, this.baseTorusStyle), { innerColor: _config_1.default.style.curvedresolution.upcolor }),
            [_enums_1.EPosition.Down]: Object.assign(Object.assign({}, this.baseTorusStyle), { innerColor: _config_1.default.style.curvedresolution.downcolor }),
            [_enums_1.EPosition.Zero]: Object.assign(Object.assign({}, this.baseTorusStyle), { innerColor: 0x071226, outerColor: _config_1.default.style.curvedresolution.zerocolor }),
            [_enums_1.EPosition.NoContest]: Object.assign(Object.assign({}, this.baseTorusStyle), { innerColor: _config_1.default.style.curvedresolution.nocontest })
        };
        this.baseInnerLineStyle = {
            width: _config_1.default.style.linesize,
            color: _config_1.default.style.linecolor,
            alpha: 1,
            join: 'round',
            cap: 'round',
            zIndex: 2,
        };
        this.innerLineStyle = {
            [_enums_1.EPosition.Undefined]: this.baseInnerLineStyle,
            [_enums_1.EPosition.Up]: this.baseInnerLineStyle,
            [_enums_1.EPosition.Down]: this.baseInnerLineStyle,
            [_enums_1.EPosition.Zero]: Object.assign(Object.assign({}, this.baseInnerLineStyle), { color: 0x071226 }),
            [_enums_1.EPosition.NoContest]: this.baseInnerLineStyle,
        };
        this.baseLineStyle = {
            width: _config_1.default.style.curvedresolution.linesize,
            color: _config_1.default.style.curvedresolution.linecolor,
            alpha: 1,
            join: 'round',
            cap: 'round',
            zIndex: 1,
        };
        this.actualLineStyle = Object.assign(Object.assign({}, this.baseLineStyle), { alpha: 0.1 });
        this.resolutionLineStyle = {
            [_enums_1.EPosition.Undefined]: Object.assign(Object.assign({}, this.baseLineStyle), { color: 0xFFFFFF, alpha: 0.1 }),
            [_enums_1.EPosition.Up]: Object.assign(Object.assign({}, this.baseLineStyle), { color: _config_1.default.style.curvedresolution.upcolor }),
            [_enums_1.EPosition.Down]: Object.assign(Object.assign({}, this.baseLineStyle), { color: _config_1.default.style.curvedresolution.downcolor }),
            [_enums_1.EPosition.Zero]: Object.assign(Object.assign({}, this.baseLineStyle), { color: _config_1.default.style.curvedresolution.zerocolor }),
            [_enums_1.EPosition.NoContest]: Object.assign(Object.assign({}, this.baseLineStyle), { color: _config_1.default.style.curvedresolution.nocontest })
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
    get rendererId() {
        return PoolResolutionChartLine.POOL_RESOLUTION_CHART_LINE_ID;
    }
    get animations() {
        return this.configAnimations;
    }
    updatePool(pool, context, container) {
        if (!pool.openPriceTimestamp || !pool.openPriceValue)
            return this.clear();
        const rprice = this.getResolutionPricePoint(pool, context);
        if (context.features.curvedResolutionLines) {
            this.clear('actualLine');
            const resolution = this.getPoolResolution(pool, context);
            const [group] = this.updateGroup(context, container, pool);
            this.updateOpenPoint(context, group, resolution, pool);
            this.updateResPoint(context, group, resolution, rprice);
            this.drawResolutionLine(pool, context, group, resolution, rprice);
        }
        else if (this.isActualPool(pool)) {
            this.clear('group');
            this.clear('resolutionLine');
            this.clear('innerLine');
            this.clear('openpoint');
            this.clear('respoint');
            this.drawActualLine(context, container, pool, rprice);
        }
        else {
            this.clear();
        }
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
    drawActualLine(context, container, pool, rprice) {
        if (!rprice)
            return this.clear('actualLine');
        const [actualLine, actualLineState] = this.get('actualLine', () => new pixi_1.Graphics());
        if (actualLineState.new)
            container.addChild(actualLine);
        const { xs, ys } = context.plotdata;
        const { width, height } = context.screen;
        const { timerange, pricerange } = context.plotdata;
        const [startx, endx] = datamath_1.default.scale([pool.openPriceTimestamp, rprice.timestamp], timerange, width);
        const [starty, endy] = datamath_1.default.scaleReverse([Number(pool.openPriceValue), Number(rprice.value)], pricerange, height);
        const poolxs = [];
        const poolys = [];
        poolxs.push(startx);
        poolys.push(starty);
        for (const idx in xs) {
            if ((0, calc_utils_1.gte)(xs[idx], endx))
                break;
            if ((0, calc_utils_1.gt)(xs[idx], startx)) {
                poolxs.push(xs[idx]);
                poolys.push(ys[idx]);
            }
        }
        poolxs.push(endx);
        poolys.push(endy);
        this.drawLine(context, actualLine, [poolxs, poolys], this.actualLineStyle);
    }
    drawResolutionLine(pool, context, container, resolution, rprice) {
        if (!rprice) {
            this.clear('resolutionLine');
            this.clear('innerLine');
            return;
        }
        const { xs, ys } = context.plotdata;
        const { width, height } = context.screen;
        const { timerange, pricerange } = context.plotdata;
        const [startx, endx] = datamath_1.default.scale([pool.openPriceTimestamp, rprice.timestamp], timerange, width);
        const [starty, endy] = datamath_1.default.scaleReverse([Number(pool.openPriceValue), Number(rprice.value)], pricerange, height);
        const poolxs = [];
        const poolys = [];
        poolxs.push(startx);
        poolys.push(starty);
        for (const idx in xs) {
            if ((0, calc_utils_1.gte)(xs[idx], endx))
                break;
            if ((0, calc_utils_1.gt)(xs[idx], startx)) {
                poolxs.push(xs[idx]);
                poolys.push(ys[idx]);
            }
        }
        poolxs.push(endx);
        poolys.push(endy);
        const resolutionLineStyle = this.resolutionLineStyle[resolution];
        const [resolutionLine, resolutionLineState] = this.get('resolutionLine', () => new pixi_1.Graphics());
        if (resolutionLineState.new) {
            resolutionLine.zIndex = resolutionLineStyle.zIndex;
            container.addChild(resolutionLine);
        }
        this.drawLine(context, resolutionLine, [poolxs, poolys], resolutionLineStyle);
        const innerLineStyle = this.innerLineStyle[resolution];
        const [innerLine, innerLineState] = this.get('innerLine', () => new pixi_1.Graphics());
        if (innerLineState.new) {
            innerLine.zIndex = innerLineStyle.zIndex;
            container.addChild(innerLine);
        }
        this.drawLine(context, innerLine, [poolxs, poolys], innerLineStyle);
    }
    drawLine(context, line, [xs, ys], style) {
        let prevY = null;
        for (const idx in xs) {
            const x = xs[idx];
            const y = ys[idx];
            if (+idx === 0) {
                line
                    .clear()
                    .lineStyle(style)
                    .moveTo(x, y);
            }
            else if (+idx + 1 === xs.length) {
                if (context.features.rectungedPriceLine)
                    line.lineTo(x, prevY);
                line.lineTo(x, y);
            }
            else {
                if (context.features.rectungedPriceLine)
                    line.lineTo(x, prevY);
                line.lineTo(x, y);
            }
            prevY = y;
        }
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
exports.PoolResolutionChartLine = PoolResolutionChartLine;
PoolResolutionChartLine.POOL_RESOLUTION_CHART_LINE_ID = Symbol('POOL_RESOLUTION_CHART_LINE_ID');
//# sourceMappingURL=PoolResolutionChartLine.js.map