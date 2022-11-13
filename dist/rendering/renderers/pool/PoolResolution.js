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
const symbols_1 = require("../../textures/symbols");
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
        this.textStyle = {
            fontWeight: 600,
            fontFamily: 'Gilroy',
            fontSize: 12,
            fill: 0x22273F
        };
        this.coverStyle = {
            paddingx: 10,
            paddingy: 5,
            paddingTop: 10,
            paddingLeft: 10,
            radiuses: [8, 8, 8, 2],
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
        const [x] = datamath_1.default.scale([pool.resolutionDate], timerange, width);
        const [title, titlestate] = this.get('title', () => this.createTitle(context));
        title.position.set(x + this.coverStyle.paddingLeft, this.coverStyle.paddingTop);
        if (titlestate.new)
            container.addChild(title);
        const [line, linestate] = this.get('line', () => this.createLine(context));
        line.position.x = x;
        line.height = height;
        if (linestate.new)
            container.addChild(line);
    }
    createTitle(context) {
        const { paddingx, paddingy } = this.coverStyle;
        const text = new pixi_1.Text('Resolution', this.textStyle);
        text.position.set(paddingx, paddingy);
        const width = text.width + paddingx * 2;
        const height = text.height + paddingy * 2;
        const textureName = this.getLevelTextureName(context);
        const gradient = context.textures.get(textureName, { width, height });
        const { radiuses } = this.coverStyle;
        const cover = _rendering_1.GraphicUtils.createRoundedRect([0, 0], [width, height], radiuses, { texture: gradient });
        const title = new pixi_1.Container();
        title.addChild(cover, text);
        return title;
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
    getLevelTextureName(context) {
        var _a, _b;
        switch ((_a = context.metapool) === null || _a === void 0 ? void 0 : _a.level) {
            case _constants_1.SILVER:
                return symbols_1.SILVER_LEVEL_TEXTURE;
            case _constants_1.GOLD:
                return symbols_1.GOLD_LEVEL_TEXTURE;
            case _constants_1.ROYAL:
                return symbols_1.ROYAL_LEVEL_TEXTURE;
            default:
                _infra_1.Logger.error(`metapool level "${(_b = context.metapool) === null || _b === void 0 ? void 0 : _b.level}" is not supported, fallback to SILVER`);
                return symbols_1.SILVER_LEVEL_TEXTURE;
        }
    }
}
exports.PoolResolution = PoolResolution;
PoolResolution.POOL_RESOLUTION_ID = Symbol('POOL_RESOLUTION_ID');
//# sourceMappingURL=PoolResolution.js.map