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
        this.torusStyle = {
            [_enums_1.EPosition.Undefined]: {
                innerr: 3,
                outerr: 8,
                innerColor: 0xFFFFFF,
                outerColor: 0xFFFFFF,
            },
            [_enums_1.EPosition.Up]: {
                innerr: 3,
                outerr: 8,
                innerColor: _config_1.default.style.curvedresolution.upcolor,
                outerColor: 0xFFFFFF,
            },
            [_enums_1.EPosition.Down]: {
                innerr: 3,
                outerr: 8,
                innerColor: _config_1.default.style.curvedresolution.downcolor,
                outerColor: 0xFFFFFF,
            },
            [_enums_1.EPosition.Zero]: {
                innerr: 3,
                outerr: 8,
                innerColor: 0x071226,
                outerColor: _config_1.default.style.curvedresolution.zerocolor,
            },
            [_enums_1.EPosition.NoContest]: {
                innerr: 3,
                outerr: 8,
                innerColor: _config_1.default.style.curvedresolution.nocontest,
                outerColor: 0xFFFFFF,
            }
        };
        this.baseInnerLineStyle = {
            width: _config_1.default.style.linesize,
            color: _config_1.default.style.linecolor,
            alpha: 1,
            join: 'round',
            cap: 'round',
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
        const resolution = this.getResolutionPricePoint(pool, context);
        if (!resolution)
            return this.clear();
        if (context.features.curvedResolutionLines) {
            this.clear('actualLine');
            const position = this.getPoolResolution(pool, context);
            const [resolutiongroup, resolutiongroupstate] = this.get('resolutiongroup', () => new pixi_1.Graphics());
            if (resolutiongroupstate.new)
                container.addChild(resolutiongroup);
            const [resolutionLine, resolutionLineState] = this.get('resolutionLine', () => new pixi_1.Graphics());
            if (resolutionLineState.new)
                resolutiongroup.addChild(resolutionLine);
            const [innerLine, innerLineState] = this.get('innerLine', () => new pixi_1.Graphics());
            if (innerLineState.new)
                resolutiongroup.addChild(innerLine);
            const [openpoint, openpointstate] = this.get('openpoint', () => this.createPricePoint(pool, context, this.torusStyle[position]), [position]);
            if (openpointstate.new)
                resolutiongroup.addChild(openpoint);
            const [respoint, respointstate] = this.get('respoint', () => this.createPricePoint(pool, context, this.torusStyle[position]), [position]);
            if (respointstate.new)
                resolutiongroup.addChild(respoint);
            this.drawResolutionLine(pool, context, position, resolution);
        }
        else if (this.isActualPool(pool)) {
            this.clear('resolutiongroup');
            this.clear('resolutionLine');
            this.clear('innerLine');
            this.clear('openpoint');
            this.clear('respoint');
            const [actualLine, actualLineState] = this.get('actualLine', () => new pixi_1.Graphics());
            if (actualLineState.new)
                container.addChild(actualLine);
            this.drawActualLine(pool, context, resolution);
        }
        else {
            this.clear();
        }
    }
    drawActualLine(pool, context, resolution) {
        const { xs, ys } = context.plotdata;
        const { width, height } = context.screen;
        const { timerange, pricerange } = context.plotdata;
        const [startx, endx] = datamath_1.default.scale([pool.openPriceTimestamp, resolution.timestamp], timerange, width);
        const [starty, endy] = datamath_1.default.scaleReverse([Number(pool.openPriceValue), Number(resolution.value)], pricerange, height);
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
        const [actualLine] = this.read('actualLine');
        this.drawLine(context, actualLine, [poolxs, poolys], this.actualLineStyle);
    }
    drawResolutionLine(pool, context, position, resolution) {
        const { xs, ys } = context.plotdata;
        const { width, height } = context.screen;
        const { timerange, pricerange } = context.plotdata;
        const [startx, endx] = datamath_1.default.scale([pool.openPriceTimestamp, resolution.timestamp], timerange, width);
        const [starty, endy] = datamath_1.default.scaleReverse([Number(pool.openPriceValue), Number(resolution.value)], pricerange, height);
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
        const [resolutionLine] = this.read('resolutionLine');
        const [innerLine] = this.read('innerLine');
        this.drawLine(context, resolutionLine, [poolxs, poolys], this.resolutionLineStyle[position]);
        this.drawLine(context, innerLine, [poolxs, poolys], this.innerLineStyle[position]);
        const [resolutiongroup, resolutiongroupstate] = this.read('resolutiongroup');
        const [openpoint] = this.read('openpoint');
        openpoint.position.set(startx, starty);
        const [respoint] = this.read('respoint');
        respoint.position.set(endx, endy);
        if (this.isHistoricalPool(pool, context)) {
            const poolid = pool.poolid;
            if (!resolutiongroupstate.subscribed) {
                resolutiongroupstate.subscribed = true;
                context.eventTarget.addEventListener('poolhover', (e) => {
                    if (e.poolid !== poolid)
                        return;
                    this.rebind(poolid);
                    this.animate('resolutiongroup', 'fadein');
                });
                context.eventTarget.addEventListener('poolunhover', (e) => {
                    if (e.poolid !== poolid)
                        return;
                    this.rebind(poolid);
                    this.animate('resolutiongroup', 'fadeout');
                });
            }
            if (resolutiongroupstate.new) {
                resolutiongroup.alpha = 0.7;
            }
            else if (resolutiongroupstate.animation !== 'fadein') {
                this.animate('resolutiongroup', 'fadeout');
            }
        }
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
    createPricePoint(pool, context, style) {
        const inner = _rendering_1.GraphicUtils.createCircle([0, 0], style.innerr, { color: style.innerColor });
        const outer = _rendering_1.GraphicUtils.createCircle([0, 0], style.outerr, { color: style.outerColor });
        const pointer = new pixi_1.Container();
        pointer.addChild(outer, inner);
        return pointer;
    }
}
exports.PoolResolutionChartLine = PoolResolutionChartLine;
PoolResolutionChartLine.POOL_RESOLUTION_CHART_LINE_ID = Symbol('POOL_RESOLUTION_CHART_LINE_ID');
//# sourceMappingURL=PoolResolutionChartLine.js.map