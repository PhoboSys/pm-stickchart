"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoundResolutionLine = void 0;
const _config_1 = __importDefault(require("../../../config.js"));
const _rendering_1 = require("../../index.js");
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const _enums_1 = require("../../../enums/index.js");
const pixi_1 = require("../../../lib/pixi");
const BaseRoundsRenderer_1 = require("./BaseRoundsRenderer");
class RoundResolutionLine extends BaseRoundsRenderer_1.BaseRoundsRenderer {
    constructor() {
        super(...arguments);
        this.baseTorusStyle = {
            inner: 3,
            outer: 8,
            zIndex: 2,
            innerColor: 0xFFFFFF,
            outerColor: 0xFFFFFF,
        };
        this.torusStyle = {
            [_enums_1.EPosition.Undefined]: Object.assign(Object.assign({}, this.baseTorusStyle), { innerAlpha: 0 }),
            [_enums_1.EPosition.Up]: Object.assign(Object.assign({}, this.baseTorusStyle), { innerColor: _config_1.default.style.linearresolution.upcolor }),
            [_enums_1.EPosition.Down]: Object.assign(Object.assign({}, this.baseTorusStyle), { innerColor: _config_1.default.style.linearresolution.downcolor }),
            [_enums_1.EPosition.Zero]: Object.assign(Object.assign({}, this.baseTorusStyle), { innerColor: _config_1.default.style.linearresolution.zerocolor }),
            [_enums_1.EPosition.NoContest]: Object.assign(Object.assign({}, this.baseTorusStyle), { innerColor: _config_1.default.style.linearresolution.nocontest }),
            won: Object.assign(Object.assign({}, this.baseTorusStyle), { innerColor: _config_1.default.style.linearresolution.won })
        };
        this.baseLineStyle = {
            color: 0xFFFFFF,
            width: 5,
            alpha: 1,
            zIndex: 1,
        };
        this.lineStyle = {
            [_enums_1.EPosition.Undefined]: Object.assign(Object.assign({}, this.baseLineStyle), { alpha: 0.9 }),
            [_enums_1.EPosition.Up]: Object.assign(Object.assign({}, this.baseLineStyle), { color: _config_1.default.style.linearresolution.upcolor }),
            [_enums_1.EPosition.Down]: Object.assign(Object.assign({}, this.baseLineStyle), { color: _config_1.default.style.linearresolution.downcolor }),
            [_enums_1.EPosition.Zero]: Object.assign(Object.assign({}, this.baseLineStyle), { color: _config_1.default.style.linearresolution.zerocolor }),
            [_enums_1.EPosition.NoContest]: Object.assign(Object.assign({}, this.baseLineStyle), { color: _config_1.default.style.linearresolution.nocontest }),
            won: Object.assign(Object.assign({}, this.baseLineStyle), { color: _config_1.default.style.linearresolution.won }),
        };
        this.configAnimations = {
            circlein: {
                pixi: {
                    alpha: 1,
                },
                duration: 0.5,
                ease: 'power2.out',
                clear: true,
            },
            circleout: {
                pixi: {
                    alpha: 0,
                },
                duration: 0.3,
                ease: 'power2.out',
                delay: 0.2,
            },
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
                    alpha: 0.8,
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
        return RoundResolutionLine.ROUND_RESOLUTION_LINE_ID;
    }
    updateRound(round, context, container) {
        var _a;
        if (context.features.curvedResolutionLines || !round.entryPriceTimestamp || !round.entryPriceValue)
            return this.clear();
        const [group] = this.updateGroup(context, container, round);
        const rprice = this.getResolutionPricePoint(round, context);
        const resolution = this.getRoundResolution(round, context);
        const isHistorical = this.isHistoricalRound(round, context);
        const nocontest = resolution === _enums_1.EPosition.NoContest;
        const predictions = (_a = context.predictions) === null || _a === void 0 ? void 0 : _a[round.roundid];
        const hasWonPrediction = predictions && predictions.some(prediction => prediction.position === resolution && isHistorical && !nocontest && !prediction.phantom);
        this.updateOpenPoint(context, group, resolution, round, hasWonPrediction);
        this.updateResPoint(context, group, resolution, rprice, hasWonPrediction);
        this.updateResolutionLine(context, group, resolution, round, rprice, hasWonPrediction);
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
                    this.animate('openpoint', 'circlein');
                    this.animate('respoint', 'circlein');
                });
                context.eventTarget.addEventListener('roundunhover', (e) => {
                    if (e.roundid !== roundid)
                        return;
                    this.rebind(roundid);
                    this.animate('group', 'fadeout');
                    this.animate('openpoint', 'circleout');
                    this.animate('respoint', 'circleout');
                });
            }
            if (groupstate.new) {
                group.alpha = 0.8;
            }
            else if (groupstate.animation !== 'fadein') {
                this.animate('group', 'fadeout');
                this.animate('openpoint', 'circleout');
                this.animate('respoint', 'circleout');
            }
        }
        return [group, groupstate];
    }
    updateOpenPoint(context, container, resolution, round, won) {
        const { timerange, pricerange } = context.plotdata;
        const { width, height } = context.screen;
        const [x] = datamath_1.default.scale([round.entryPriceTimestamp], timerange, width);
        const [y] = datamath_1.default.scaleReverse([round.entryPriceValue], pricerange, height);
        const [openpoint, openpointstate] = this.get('openpoint', () => this.createPricePoint(won ? this.torusStyle.won : this.torusStyle[resolution]), [resolution, won]);
        if (openpointstate.new)
            container.addChild(openpoint);
        openpoint.position.set(x, y);
    }
    updateResPoint(context, container, resolution, rprice, won) {
        if (!rprice)
            return this.clear('respoint');
        const { timerange, pricerange } = context.plotdata;
        const { width, height } = context.screen;
        const [x] = datamath_1.default.scale([rprice.timestamp], timerange, width);
        const [y] = datamath_1.default.scaleReverse([Number(rprice.value)], pricerange, height);
        const [respoint, respointstate] = this.get('respoint', () => this.createPricePoint(won ? this.torusStyle.won : this.torusStyle[resolution]), [resolution, won]);
        if (respointstate.new)
            container.addChild(respoint);
        respoint.position.set(x, y);
    }
    updateResolutionLine(context, container, resolution, round, rprice, won) {
        if (!rprice)
            return this.clear('line');
        const { timerange, pricerange } = context.plotdata;
        const { width, height } = context.screen;
        const [x1, x2] = datamath_1.default.scale([round.entryPriceTimestamp, rprice.timestamp], timerange, width);
        const [y1, y2] = datamath_1.default.scaleReverse([round.entryPriceValue, Number(rprice.value)], pricerange, height);
        const style = won ? this.lineStyle.won : this.lineStyle[resolution];
        const [line, linestate] = this.get('line', () => new pixi_1.Graphics());
        if (linestate.new) {
            container.addChild(line);
            line.zIndex = style.zIndex;
        }
        const radius = style.width / 2;
        line
            .clear()
            .lineStyle(style)
            .drawCircle(x1, y1, radius)
            .moveTo(x1, y1)
            .lineTo(x2, y2)
            .drawCircle(x2, y2, radius);
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
exports.RoundResolutionLine = RoundResolutionLine;
RoundResolutionLine.ROUND_RESOLUTION_LINE_ID = Symbol('ROUND_RESOLUTION_LINE_ID');
//# sourceMappingURL=RoundResolutionLine.js.map