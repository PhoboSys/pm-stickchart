"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolResolution = void 0;
const config_1 = __importDefault(require("../../../config"));
const infra_1 = require("../../../infra");
const __1 = require("../..");
const utils_1 = require("../../../lib/utils");
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
const poollevels_1 = require("../../../constants/poollevels");
const symbols_1 = require("../../textures/symbols");
const BasePoolsRenderer_1 = require("./BasePoolsRenderer");
class PoolResolution extends BasePoolsRenderer_1.BasePoolsRenderer {
    constructor() {
        super(...arguments);
        this.historicalLineStyle = {
            width: 2,
            alpha: 0,
        };
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
            paddingTop: 30,
            paddingLeft: 10,
            radiuses: [8, 8, 8, 2],
        };
    }
    get rendererId() {
        return PoolResolution.POOL_RESOLUTION_ID;
    }
    updatePool(pool, context, container) {
        if (this.isActualPool(pool)) {
            this.clearHistoricalPool();
            this.updateActualPool(pool, context, container);
        }
        else {
            this.clearActualPool();
            this.updateHistoricalPool(pool, context, container);
        }
    }
    clearActualPool() {
        this.clear('actualtitle');
        this.clear('actualline');
    }
    clearHistoricalPool() {
        this.clear('historicalline');
    }
    updateActualPool(pool, context, container) {
        const { width, height } = context.screen;
        const { timerange } = context.plotdata;
        const [x] = datamath_1.default.scale([pool.resolutionDate], timerange, width);
        if (pool.resolutionDate > (0, utils_1.nowUnixTS)()) {
            const [title, titlestate] = this.get('actualtitle', () => this.createTitle(context));
            title.position.set(x + this.coverStyle.paddingLeft, this.coverStyle.paddingTop);
            if (titlestate.new)
                container.addChild(title);
        }
        else {
            this.clear('title');
        }
        const [line, linestate] = this.get('actualline', () => this.createLine(context));
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
        const cover = __1.GraphicUtils.createRoundedRect([0, 0], [width, height], radiuses, { texture: gradient });
        const title = new pixi_1.Container();
        title.addChild(cover, text);
        return title;
    }
    createLine(context) {
        const { height } = context.screen;
        const { width } = this.lineStyle;
        const [color1, color2] = this.getLevelLineColors(context);
        const dash1 = __1.GraphicUtils.createVerticalDashLine(-width / 2, [0, height], Object.assign(Object.assign({}, this.lineStyle), { color: color1 }));
        const dash2 = __1.GraphicUtils.createVerticalDashLine(width / 2, [0, height], Object.assign(Object.assign({}, this.lineStyle), { color: color2 }));
        const dash = new pixi_1.Container();
        dash.addChild(dash1, dash2);
        return dash;
    }
    updateHistoricalPool(pool, context, container) {
        const { width, height } = context.screen;
        const { timerange } = context.plotdata;
        const [x] = datamath_1.default.scale([pool.resolutionDate], timerange, width);
        const [line, linestate] = this.get('historicalline', () => this.createHistoricalPoolLine(context));
        line.position.x = x - this.historicalLineStyle.width;
        line.height = height;
        if (linestate.new)
            container.addChild(line);
    }
    createHistoricalPoolLine(context) {
        const { height } = context.screen;
        const [color1, color2] = this.getLevelLineColors(context);
        const line = __1.GraphicUtils.createLine([0, 0], [0, height], Object.assign(Object.assign({}, this.historicalLineStyle), { color: color2 }));
        return line;
    }
    getLevelLineColors(context) {
        var _a, _b;
        switch ((_a = context.metapool) === null || _a === void 0 ? void 0 : _a.level) {
            case poollevels_1.SILVER:
                return config_1.default.style.levels.silverLineColors;
            case poollevels_1.GOLD:
                return config_1.default.style.levels.goldLineColors;
            case poollevels_1.ROYAL:
                return config_1.default.style.levels.royalLineColors;
            default:
                infra_1.Logger.error(`metapool level "${(_b = context.metapool) === null || _b === void 0 ? void 0 : _b.level}" is not supported, fallback to SILVER`);
                return config_1.default.style.levels.silverLineColors;
        }
    }
    getLevelTextureName(context) {
        var _a, _b;
        switch ((_a = context.metapool) === null || _a === void 0 ? void 0 : _a.level) {
            case poollevels_1.SILVER:
                return symbols_1.SILVER_LEVEL_TEXTURE;
            case poollevels_1.GOLD:
                return symbols_1.GOLD_LEVEL_TEXTURE;
            case poollevels_1.ROYAL:
                return symbols_1.ROYAL_LEVEL_TEXTURE;
            default:
                infra_1.Logger.error(`metapool level "${(_b = context.metapool) === null || _b === void 0 ? void 0 : _b.level}" is not supported, fallback to SILVER`);
                return symbols_1.SILVER_LEVEL_TEXTURE;
        }
    }
}
exports.PoolResolution = PoolResolution;
PoolResolution.POOL_RESOLUTION_ID = Symbol('POOL_RESOLUTION_ID');
//# sourceMappingURL=PoolResolution.js.map