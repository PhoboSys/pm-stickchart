"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolResolutionRenderer = void 0;
const config_1 = __importDefault(require("../../../config"));
const __1 = require("../..");
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
const poollevels_1 = require("../../../constants/poollevels");
const TEXTURE_NAMES = __importStar(require("../../textures/symbols"));
class PoolResolutionRenderer extends __1.BaseRenderer {
    constructor(renderer) {
        super(renderer);
        this.coverStyle = {
            paddingx: 10,
            paddingy: 5,
            paddingTop: 30,
            paddingLeft: 10,
            radiuses: [8, 8, 8, 2],
        };
        this.textStyle = {
            fontWeight: 600,
            fontFamily: 'Gilroy',
            fontSize: 12,
            fill: 0x22273F
        };
        this.lineStyle = {
            width: 1,
            join: 'round',
            cap: 'round',
            gap: 10,
            dash: 10,
        };
    }
    get rendererId() {
        return PoolResolutionRenderer.POOL_RESOLUTION_ID;
    }
    update(context, container) {
        if (!context.pool) {
            container.alpha = 0;
            return container;
        }
        container.alpha = 1;
        if (this._lastLevel !== context.pool.level) {
            this.clear();
        }
        this.updatePoolBorder(context, container);
        this._lastLevel = context.pool.level;
        return container;
    }
    getLevelLineColors(context) {
        switch (context.pool.level) {
            case poollevels_1.SILVER:
                return config_1.default.style.levels.silverLineColors;
            case poollevels_1.ROYAL:
                return config_1.default.style.levels.royalLineColors;
            case poollevels_1.GOLD:
                return config_1.default.style.levels.goldLineColors;
            default:
                throw Error('pool level is not supported');
        }
    }
    updatePoolBorder(context, container) {
        const { width, height } = context.screen;
        const { timerange } = context.plotdata;
        const [x] = datamath_1.default.scale([context.pool.resolutionDate], timerange, width);
        const [cover, coverstate] = this.get('cover', () => this.createPoolName(context));
        cover.position.set(x + this.coverStyle.paddingLeft, this.coverStyle.paddingTop);
        const [line, linestate] = this.get('dash', () => this.createDash(context));
        line.position.x = x;
        line.height = height;
        if (coverstate.new)
            container.addChild(cover);
        if (linestate.new)
            container.addChild(line);
        return container;
    }
    createPoolName(context) {
        const { paddingx, paddingy } = this.coverStyle;
        const text = new pixi_1.Text('Resolution', this.textStyle);
        text.position.set(paddingx, paddingy);
        const width = text.width + paddingx * 2;
        const height = text.height + paddingy * 2;
        const textureName = TEXTURE_NAMES[`${context.pool.level}_LEVEL_TEXTURE`];
        const gradient = context.textures.get(textureName, { width, height });
        const { radiuses } = this.coverStyle;
        const cover = __1.GraphicUtils.createRoundedRect([0, 0], [width, height], radiuses, { texture: gradient });
        const poolname = new pixi_1.Container();
        poolname.addChild(cover, text);
        return poolname;
    }
    createDash(context) {
        const { height } = context.screen;
        const { width } = this.lineStyle;
        const [color1, color2] = this.getLevelLineColors(context);
        const dash1 = __1.GraphicUtils.createVerticalDashLine(-width / 2, [0, height], Object.assign(Object.assign({}, this.lineStyle), { color: color1 }));
        const dash2 = __1.GraphicUtils.createVerticalDashLine(width / 2, [0, height], Object.assign(Object.assign({}, this.lineStyle), { color: color2 }));
        const dash = new pixi_1.Container();
        dash.addChild(dash1, dash2);
        return dash;
    }
}
exports.PoolResolutionRenderer = PoolResolutionRenderer;
PoolResolutionRenderer.POOL_RESOLUTION_ID = Symbol('POOL_RESOLUTION_ID');
//# sourceMappingURL=PoolResolutionRenderer.js.map