"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphicUtils = exports.CoveredText = void 0;
const lodash_1 = require("lodash");
const _infra_1 = require("../../infra/index.js");
const datamath_1 = __importDefault(require("../../lib/datamath"));
const pixi_1 = require("../../lib/pixi");
const pixi_2 = require("../../lib/pixi");
class CoveredText extends pixi_1.Graphics {
    update(updater, position, style) {
        this.updateText(updater, style);
        this.updatePosition(position, style);
    }
    updateText(updater, style) {
        const textGraphic = this.getChildAt(1);
        updater(textGraphic);
        const { padding = [0, 0] } = style;
        const [topPadding, rightPadding, bottomPadding = topPadding, leftPadding = rightPadding] = padding;
        const coverGraphic = this.getChildAt(0);
        coverGraphic.width = textGraphic.width + leftPadding + rightPadding;
        coverGraphic.height = textGraphic.height + topPadding + bottomPadding;
    }
    updatePosition([x, y], style) {
        const { anchor = [0, 0] } = style;
        this.position.set(x - this.width * anchor[0], y - this.height * anchor[1]);
    }
}
exports.CoveredText = CoveredText;
class GraphicUtils {
    static createCircle([x, y], radius, style) {
        const cirl = new pixi_1.Graphics()
            .beginFill(style.color)
            .drawCircle(0, 0, radius)
            .endFill();
        cirl.position.set(x, y);
        return cirl;
    }
    static createTorus([x, y], [innerr, outerr], style) {
        const torus = new pixi_1.Graphics();
        torus.beginFill(style.color);
        if (torus.drawTorus)
            torus.drawTorus(0, 0, innerr, outerr);
        else
            _infra_1.Logger.error('drawTorus is not supported install @pixi/graphics-extras');
        torus.endFill();
        torus.position.set(x, y);
        return torus;
    }
    static createRoundedRect([x, y], [width, height], [r1, r2, r3, r4], { texture, color, lineStyle, alpha = 1 } = {}, rect) {
        rect = rect !== null && rect !== void 0 ? rect : new pixi_1.Graphics();
        rect.lineStyle(Object.assign({ width: 1, alpha: 0 }, lineStyle));
        if (texture) {
            const matrix = new pixi_2.Matrix();
            matrix.tx = x;
            matrix.ty = y;
            rect.beginTextureFill({ texture, alpha, matrix });
        }
        else {
            rect.beginFill(color, alpha);
        }
        rect
            .moveTo(0 + x, r1 + y)
            .arcTo(0 + x, 0 + y, r1 + x, 0 + y, r1)
            .lineTo(width + x - r2, 0 + y)
            .arcTo(width + x, 0 + y, width + x, r2 + y, r2)
            .lineTo(width + x, height + y - r3)
            .arcTo(width + x, height + y, width + x - r3, height + y, r3)
            .lineTo(r4 + x, height + y)
            .arcTo(0 + x, height + y, 0 + x, height + y - r4, r4)
            .closePath()
            .endFill();
        // rect.position.set(x, y)
        return rect;
    }
    static createCoveredIcon([x, y], style) {
        const { paddingx, paddingy } = style;
        const icon = new pixi_2.Sprite(style.texture);
        const scale = style.iconstyle.size / icon.height;
        icon.position.set(paddingx, paddingy);
        icon.scale.set(scale);
        const coverwidth = icon.width + paddingx * 2;
        const coverheight = icon.height + paddingy * 2;
        const cover = new pixi_1.Graphics()
            .beginFill(style.color)
            .lineStyle(style.linestyle)
            .drawRoundedRect(0, 0, coverwidth, coverheight, style.radius)
            .endFill();
        const result = new pixi_1.Graphics();
        result.addChild(cover, icon);
        const { anchorx, anchory } = style;
        result.position.set(x - cover.width * (anchorx !== null && anchorx !== void 0 ? anchorx : 0), y - cover.height * (anchory !== null && anchory !== void 0 ? anchory : 0));
        return result;
    }
    static createCoveredText(value, [x, y], style) {
        var _a, _b;
        const { padding = [0, 0] } = style;
        const [topPadding, rightPadding, bottomPadding = topPadding, leftPadding = rightPadding] = padding;
        const text = GraphicUtils.createText(value, [leftPadding, topPadding], style.textstyle, [0, 0]);
        const coverwidth = text.width + leftPadding + rightPadding;
        const coverheight = text.height + topPadding + bottomPadding;
        const cover = new pixi_1.Graphics()
            .beginFill(style.color)
            .lineStyle(style.linestyle)
            .drawRoundedRect(0, 0, coverwidth, coverheight, style.radius)
            .endFill();
        const coveredText = new CoveredText();
        coveredText.addChild(cover, text);
        const { anchor = [0, 0] } = style;
        coveredText.position.set(x - cover.width * ((_a = anchor[0]) !== null && _a !== void 0 ? _a : 0), y - cover.height * ((_b = anchor[1]) !== null && _b !== void 0 ? _b : 0));
        return coveredText;
    }
    static createVerticalDashLine(x, [y1, y2], linestyle) {
        const dashLine = new pixi_1.Graphics()
            .lineStyle(linestyle)
            .moveTo(x, y1);
        const maxsteps = 100;
        const stepsize = linestyle.dash + linestyle.gap;
        const ysteps = datamath_1.default.steps([y1 + stepsize, y2 - stepsize], stepsize, maxsteps);
        for (const ystep of ysteps) {
            if (ystep === y1)
                continue;
            dashLine
                .lineTo(x, ystep - linestyle.gap)
                .moveTo(x, ystep);
        }
        return dashLine;
    }
    static createTexturedVerticalDashLine(x, [y1, y2], linestyle) {
        const dashLine = new pixi_1.Graphics()
            .lineStyle(linestyle)
            .beginTextureFill({ texture: linestyle.texture })
            .moveTo(x, y1);
        const maxsteps = 100;
        const stepsize = linestyle.dash + linestyle.gap;
        const ysteps = datamath_1.default.steps([y1 + stepsize, y2 - stepsize], stepsize, maxsteps);
        for (const ystep of ysteps) {
            if (ystep === y1)
                continue;
            dashLine
                .lineTo(x, ystep - linestyle.gap)
                .moveTo(x, ystep);
        }
        return dashLine;
    }
    static createLine([x1, y1], [x2, y2], linestyle) {
        const line = (new pixi_1.Graphics())
            .lineStyle(linestyle)
            .moveTo(x1, y1)
            .lineTo(x2, y2);
        return line;
    }
    static createText(value, [x, y], textstyle, anchor = 0) {
        const style = new pixi_1.TextStyle(textstyle);
        const text = new pixi_1.Text(String(value), style);
        text.position.set(x, y);
        text.roundPixels = false;
        text.resolution = Math.ceil(window.devicePixelRatio);
        text.anchor.set(...(0, lodash_1.castArray)(anchor));
        return text;
    }
    static createPropagationBackground({ lineHeight, width, height, colors, duration }) {
        if (colors.length === 1) {
            colors.push({ color: 0xffffff, alpha: 0 });
        }
        const container = new pixi_2.Container();
        const lines = new pixi_1.Graphics();
        const mask = new pixi_1.Graphics();
        mask
            .beginFill()
            .drawRect(0, 0, width, height)
            .endFill();
        container.addChild(lines);
        container.mask = mask;
        container.addChild(mask);
        const colorsSize = colors.length;
        const linesSize = Math.ceil(height / lineHeight) + colorsSize;
        for (let i = 0; i < linesSize; i++) {
            const color = colors[i % colorsSize];
            lines.beginFill(color.color, color.alpha === undefined ? 1 : color.alpha);
            lines.drawRect(0, i * lineHeight, width, lineHeight);
            lines.endFill();
        }
        pixi_2.gsap.to(lines, {
            pixi: { y: -1 * colorsSize * lineHeight },
            duration,
            repeat: -1,
            ease: 'power0',
        });
        return container;
    }
}
exports.GraphicUtils = GraphicUtils;
//# sourceMappingURL=GraphicUtils.js.map