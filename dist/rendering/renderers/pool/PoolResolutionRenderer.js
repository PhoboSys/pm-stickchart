"use strict";
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
class PoolResolutionRenderer extends __1.BaseRenderer {
    constructor(renderer) {
        super(renderer);
        this.coverStyle = {
            paddingx: 10,
            paddingy: 5,
            paddingTop: 30,
            paddingLeft: 10,
            radius: 8,
        };
        this.textStyle = {
            fontWeight: 600,
            fontFamily: 'Gilroy',
            fontSize: 12,
        };
        this.torusStyle = {
            innerr: 2.5,
            outerr: 5,
            paddingTop: 5,
        };
        this.lineStyle = {
            width: 1,
            join: 'round',
            cap: 'round',
            gap: 10,
            dash: 10,
            paddingTop: 5,
            paddingBottom: 30
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
    getLevelGradientColors(context) {
        switch (context.pool.level) {
            case poollevels_1.SILVER:
                return config_1.default.style.levels.silverColors;
            case poollevels_1.ROYAL:
                return config_1.default.style.levels.royalColors;
            case poollevels_1.GOLD:
                return config_1.default.style.levels.goldColors;
            default:
                throw Error('pool level is not supported');
        }
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
        const [cover, coverstate] = this.get('poolName', () => this.createPoolName(context));
        cover.position.set(x + this.coverStyle.paddingLeft, this.coverStyle.paddingTop);
        const [torus, torusstate] = this.get('torus', () => this.createTorus(context));
        torus.position.set(x, cover.position.y + cover.height);
        const [line, linestate] = this.get('dash', () => this.createDash(context));
        line.position.set(x, torus.position.y + this.torusStyle.outerr);
        line.height = height - line.position.y - this.lineStyle.paddingBottom;
        if (coverstate.new)
            container.addChild(cover);
        if (torusstate.new)
            container.addChild(torus);
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
        const angle = 100;
        const x0 = -angle + 20;
        const y0 = 0;
        const x1 = width - angle;
        const y1 = -angle;
        const coverGradient = pixi_1.GradientFactory.createLinearGradient(context.renderer, pixi_1.RenderTexture.create({ width, height }), {
            x0,
            y0,
            x1,
            y1,
            colorStops: this.getLevelGradientColors(context)
        });
        const { radius } = this.coverStyle;
        const cover = new pixi_1.Graphics()
            .beginTextureFill({ texture: coverGradient })
            .drawRoundedRect(0, 0, width, height, radius)
            .endFill();
        const poolname = new pixi_1.Container();
        poolname.addChild(cover, text);
        return poolname;
    }
    createTorus(context) {
        const { innerr, outerr } = this.torusStyle;
        const size = outerr * 2;
        const gradient = pixi_1.GradientFactory.createLinearGradient(context.renderer, pixi_1.RenderTexture.create({ width: size, height: size }), {
            x0: 0,
            y0: size,
            x1: size,
            y1: 0,
            colorStops: this.getLevelGradientColors(context)
        });
        const torus = new pixi_1.Graphics()
            .beginTextureFill({ texture: gradient, })
            .drawTorus(0, 0, innerr, outerr)
            .endFill();
        return torus;
    }
    createDash(context) {
        const { height } = context.screen;
        const { paddingBottom, paddingTop, width } = this.lineStyle;
        const [color1, color2] = this.getLevelLineColors(context);
        const dash1 = __1.GraphicUtils.createVerticalDashLine(-width / 2, [0, height - paddingBottom], Object.assign(Object.assign({}, this.lineStyle), { color: color1 }));
        const dash2 = __1.GraphicUtils.createVerticalDashLine(width / 2, [0, height - paddingBottom], Object.assign(Object.assign({}, this.lineStyle), { color: color2 }));
        const dash = new pixi_1.Container();
        dash.addChild(dash1, dash2);
        dash.position.y = paddingTop;
        return dash;
    }
}
exports.PoolResolutionRenderer = PoolResolutionRenderer;
PoolResolutionRenderer.POOL_RESOLUTION_ID = Symbol('POOL_RESOLUTION_ID');
//# sourceMappingURL=PoolResolutionRenderer.js.map