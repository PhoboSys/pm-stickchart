"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolResolution = void 0;
const _config_1 = __importDefault(require("../../../config.js"));
const _infra_1 = require("../../../infra/index.js");
const _rendering_1 = require("../../index.js");
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
const _constants_1 = require("../../../constants/index.js");
const BasePoolsRenderer_1 = require("./BasePoolsRenderer");
class PoolResolution extends BasePoolsRenderer_1.BasePoolsRenderer {
    constructor() {
        super(...arguments);
        this.lineStyle = {
            width: 1,
            join: 'round',
            cap: 'round',
            gap: 10,
            dash: 10,
        };
    }
    get rendererId() {
        return PoolResolution.POOL_RESOLUTION_ID;
    }
    updatePool(pool, context, container) {
        if (this.isHistoricalPool(pool, context))
            return this.clear();
        this.updateActualPool(pool, context, container);
    }
    updateActualPool(pool, context, container) {
        const { width, height } = context.screen;
        const { timerange } = context.plotdata;
        const [x] = datamath_1.default.scale([pool.endDate], timerange, width);
        const [line, linestate] = this.get('line', () => this.createLine(context));
        line.position.x = x;
        line.height = height;
        if (linestate.new)
            container.addChild(line);
    }
    createLine(context) {
        const { height } = context.screen;
        const { width } = this.lineStyle;
        const [color1, color2] = this.getLevelLineColors(context);
        const dash1 = _rendering_1.GraphicUtils.createVerticalDashLine(-width / 2, [0, height], Object.assign(Object.assign({}, this.lineStyle), { color: color1 }));
        const dash2 = _rendering_1.GraphicUtils.createVerticalDashLine(width / 2, [0, height], Object.assign(Object.assign({}, this.lineStyle), { color: color2 }));
        const dash = new pixi_1.Container();
        dash.addChild(dash1, dash2);
        return dash;
    }
    getLevelLineColors(context) {
        var _a, _b;
        switch ((_a = context.metapool) === null || _a === void 0 ? void 0 : _a.level) {
            case _constants_1.SILVER:
                return _config_1.default.style.levels.silverLineColors;
            case _constants_1.GOLD:
                return _config_1.default.style.levels.goldLineColors;
            case _constants_1.ROYAL:
                return _config_1.default.style.levels.royalLineColors;
            default:
                _infra_1.Logger.error(`metapool level "${(_b = context.metapool) === null || _b === void 0 ? void 0 : _b.level}" is not supported, fallback to SILVER`);
                return _config_1.default.style.levels.silverLineColors;
        }
    }
}
exports.PoolResolution = PoolResolution;
PoolResolution.POOL_RESOLUTION_ID = Symbol('POOL_RESOLUTION_ID');
//# sourceMappingURL=PoolResolution.js.map