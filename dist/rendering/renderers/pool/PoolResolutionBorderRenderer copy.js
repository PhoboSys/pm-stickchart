"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolResolutionBorderRenderer = void 0;
const config_1 = __importDefault(require("../../../config"));
const __1 = require("../..");
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
class PoolResolutionBorderRenderer extends __1.BaseRenderer {
    constructor(renderer) {
        super(renderer);
        this.coverStyle = {
            paddingx: 20,
            paddingy: 10,
            radius: 8,
            paddingTop: 30,
            paddingLeft: 5,
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
            width: 2,
            alpha: 0.7,
            join: 'round',
            cap: 'round',
            gap: 10,
            dash: 10,
            paddingTop: 5,
            paddingBottom: 20
        };
    }
    get rendererId() {
        return PoolResolutionBorderRenderer.POOL_RESOLUTION_BORDER_ID;
    }
    update(context, container) {
        if (!context.pool) {
            this.clear();
            return container;
        }
        this.updatePoolBorder(context, container);
        return container;
    }
    getLevelGradientColors(context) {
        // switch (context.pool.level) {
        //     case SILVER:
        //         return config.style.levels.royalColors
        //     case ROYAL:
        //         return config.style.levels.silverColors
        //     case GOLD:
        //         return config.style.levels.goldColors
        //     default:
        //         throw Error('pool level is not supported')
        // }
        return config_1.default.style.levels.royalColors;
    }
    updatePoolBorder(context, container) {
        const { width, height } = context.screen;
        const { timerange } = context.plotdata;
        const [x] = datamath_1.default.scale([context.pool.resolutionDate], timerange, width);
        const [cover, coverstate] = this.get('poolName', () => this.createPoolName(context));
        if (coverstate.new) {
            cover.position.y = this.coverStyle.paddingTop;
            container.addChild(cover);
        }
        cover.position.x = x + this.coverStyle.paddingLeft;
        const [torus, torusstate] = this.get('torus', () => this.createTorus(context));
        if (torusstate.new) {
            torus.position.y = cover.position.y + cover.height;
            container.addChild(torus);
        }
        torus.position.x = x;
        const [line, linestate] = this.get('dash', () => this.createDash(context));
        if (linestate.new) {
            line.position.y += torus.position.y + this.torusStyle.outerr;
            container.addChild(line);
        }
        line.height = height - line.position.y - this.lineStyle.paddingBottom;
        line.position.x = x;
        return container;
    }
    createPoolName(context) {
        const { paddingx, paddingy } = this.coverStyle;
        const text = new pixi_1.Text('Resolution', this.textStyle);
        text.position.set(paddingx, paddingy);
        const width = text.width + paddingx * 2;
        const height = text.height + paddingy * 2;
        const x0 = 0;
        const y0 = width;
        const x1 = width;
        const y1 = 0;
        const coverGradient = pixi_1.GradientFactory.createLinearGradient(context.renderer, pixi_1.RenderTexture.create({ width, height: height * 1.5 }), {
            x0,
            y0,
            x1,
            y1,
            colorStops: this.getLevelGradientColors(context)
        });
        const sprite = new pixi_1.Sprite(coverGradient);
        const { radius } = this.coverStyle;
        const cover = new pixi_1.Graphics()
            .beginTextureFill({ texture: coverGradient })
            .drawRoundedRect(0, 0, width, height, radius)
            .endFill();
        const poolname = new pixi_1.Graphics();
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
        const { width: linewidth } = this.lineStyle;
        const [gradient] = this.get('resolutionDashGradient', () => pixi_1.GradientFactory.createLinearGradient(context.renderer, pixi_1.RenderTexture.create({ height, width: linewidth }), {
            x0: linewidth,
            y0: height,
            x1: 0,
            y1: 0,
            colorStops: this.getLevelGradientColors(context)
        }));
        const { paddingBottom, paddingTop } = this.lineStyle;
        const dash = __1.GraphicUtils.createTexturedVerticalDashLine(0, [0, height - paddingBottom], Object.assign(Object.assign({}, this.lineStyle), { texture: gradient }));
        dash.position.y = paddingTop;
        return dash;
    }
}
exports.PoolResolutionBorderRenderer = PoolResolutionBorderRenderer;
PoolResolutionBorderRenderer.POOL_RESOLUTION_BORDER_ID = Symbol('POOL_RESOLUTION_BORDER_ID');
//# sourceMappingURL=PoolResolutionBorderRenderer%20copy.js.map