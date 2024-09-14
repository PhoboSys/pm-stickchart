"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoundResolutionChartLine = void 0;
const _config_1 = __importDefault(require("../../../config.js"));
const _rendering_1 = require("../../index.js");
const _enums_1 = require("../../../enums/index.js");
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
const calc_utils_1 = require("../../../lib/calc-utils");
const BaseRoundsRenderer_1 = require("./BaseRoundsRenderer");
class RoundResolutionChartLine extends BaseRoundsRenderer_1.BaseRoundsRenderer {
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
        return RoundResolutionChartLine.ROUND_RESOLUTION_CHART_LINE_ID;
    }
    get animations() {
        return this.configAnimations;
    }
    updateRound(round, context, container) {
        if (!round.entryPriceTimestamp || !round.entryPriceValue)
            return this.clear();
        const rprice = this.getResolutionPricePoint(round, context);
        if (context.features.curvedResolutionLines) {
            this.clear('actualLine');
            const resolution = this.getRoundResolution(round, context);
            const [group] = this.updateGroup(context, container, round);
            this.updateOpenPoint(context, group, resolution, round);
            this.updateResPoint(context, group, resolution, rprice);
            this.drawResolutionLine(round, context, group, resolution, rprice);
        }
        else if (this.isActualRound(round, context)) {
            this.clear('group');
            this.clear('resolutionLine');
            this.clear('innerLine');
            this.clear('openpoint');
            this.clear('respoint');
            this.drawActualLine(context, container, round, rprice);
        }
        else {
            this.clear();
        }
    }
    updateGroup(context, container, round) {
        const [group, groupstate] = this.get('group', () => new pixi_1.Graphics());
        if (groupstate.new) {
            group.sortableChildren = true;
            container.addChild(group);
        }
        if (this.isHistoricalRound(round, context)) {
            const roundid = round.roundid;
            if (!groupstate.subscribed) {
                groupstate.subscribed = true;
                context.eventTarget.addEventListener('roundhover', (e) => {
                    if (e.roundid !== roundid)
                        return;
                    this.rebind(roundid);
                    this.animate('group', 'fadein');
                });
                context.eventTarget.addEventListener('roundunhover', (e) => {
                    if (e.roundid !== roundid)
                        return;
                    this.rebind(roundid);
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
    updateOpenPoint(context, container, resolution, round) {
        const { timerange, pricerange } = context.plotdata;
        const { width, height } = context.screen;
        const [x] = datamath_1.default.scale([round.entryPriceTimestamp], timerange, width);
        const [y] = datamath_1.default.scaleReverse([round.entryPriceValue], pricerange, height);
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
    drawActualLine(context, container, round, rprice) {
        if (!rprice)
            return this.clear('actualLine');
        const [actualLine, actualLineState] = this.get('actualLine', () => new pixi_1.Graphics());
        if (actualLineState.new)
            container.addChild(actualLine);
        const { xs, ys } = context.plotdata;
        const { width, height } = context.screen;
        const { timerange, pricerange } = context.plotdata;
        const [startx, endx] = datamath_1.default.scale([round.entryPriceTimestamp, rprice.timestamp], timerange, width);
        const [starty, endy] = datamath_1.default.scaleReverse([Number(round.entryPriceValue), Number(rprice.value)], pricerange, height);
        const roundxs = [];
        const roundys = [];
        roundxs.push(startx);
        roundys.push(starty);
        for (const idx in xs) {
            if ((0, calc_utils_1.gte)(xs[idx], endx))
                break;
            if ((0, calc_utils_1.gt)(xs[idx], startx)) {
                roundxs.push(xs[idx]);
                roundys.push(ys[idx]);
            }
        }
        roundxs.push(endx);
        roundys.push(endy);
        this.drawLine(context, actualLine, [roundxs, roundys], this.actualLineStyle);
    }
    drawResolutionLine(round, context, container, resolution, rprice) {
        if (!rprice) {
            this.clear('resolutionLine');
            this.clear('innerLine');
            return;
        }
        const { xs, ys } = context.plotdata;
        const { width, height } = context.screen;
        const { timerange, pricerange } = context.plotdata;
        const [startx, endx] = datamath_1.default.scale([round.entryPriceTimestamp, rprice.timestamp], timerange, width);
        const [starty, endy] = datamath_1.default.scaleReverse([Number(round.entryPriceValue), Number(rprice.value)], pricerange, height);
        const roundxs = [];
        const roundys = [];
        roundxs.push(startx);
        roundys.push(starty);
        for (const idx in xs) {
            if ((0, calc_utils_1.gte)(xs[idx], endx))
                break;
            if ((0, calc_utils_1.gt)(xs[idx], startx)) {
                roundxs.push(xs[idx]);
                roundys.push(ys[idx]);
            }
        }
        roundxs.push(endx);
        roundys.push(endy);
        const resolutionLineStyle = this.resolutionLineStyle[resolution];
        const [resolutionLine, resolutionLineState] = this.get('resolutionLine', () => new pixi_1.Graphics());
        if (resolutionLineState.new) {
            resolutionLine.zIndex = resolutionLineStyle.zIndex;
            container.addChild(resolutionLine);
        }
        this.drawLine(context, resolutionLine, [roundxs, roundys], resolutionLineStyle);
        const innerLineStyle = this.innerLineStyle[resolution];
        const [innerLine, innerLineState] = this.get('innerLine', () => new pixi_1.Graphics());
        if (innerLineState.new) {
            innerLine.zIndex = innerLineStyle.zIndex;
            container.addChild(innerLine);
        }
        this.drawLine(context, innerLine, [roundxs, roundys], innerLineStyle);
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
exports.RoundResolutionChartLine = RoundResolutionChartLine;
RoundResolutionChartLine.ROUND_RESOLUTION_CHART_LINE_ID = Symbol('ROUND_RESOLUTION_CHART_LINE_ID');
//# sourceMappingURL=RoundResolutionChartLine.js.map