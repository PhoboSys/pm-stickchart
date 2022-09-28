"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphicUtils = void 0;
const lodash_1 = require("lodash");
const infra_1 = require("../../infra");
const datamath_1 = __importDefault(require("../../lib/datamath"));
const pixi_1 = require("../../lib/pixi");
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
            infra_1.Logger.error('drawTorus is not supported install @pixi/graphics-extras');
        torus.endFill();
        torus.position.set(x, y);
        return torus;
    }
    static createRoundedRect([x, y], [width, height], [r1, r2, r3, r4], { texture, color, lineStyle, alpha = 1 }) {
        const rect = new pixi_1.Graphics()
            .lineStyle(Object.assign({ width: 1, alpha: 0 }, (lineStyle !== null && lineStyle !== void 0 ? lineStyle : {})));
        if (texture)
            rect.beginTextureFill({ texture, alpha });
        else
            rect.beginFill(color, alpha);
        rect
            .moveTo(0, r1)
            .arcTo(0, 0, r1, 0, r1)
            .lineTo(width - r2, 0)
            .arcTo(width, 0, width, r2, r2)
            .lineTo(width, height - r3)
            .arcTo(width, height, width - r3, height, r3)
            .lineTo(r4, height)
            .arcTo(0, height, 0, height - r4, r4)
            .closePath()
            .endFill();
        rect.position.set(x, y);
        return rect;
    }
    static createCoveredIcon([x, y], style) {
        const { paddingx, paddingy } = style;
        const icon = new pixi_1.Sprite(style.texture);
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
        const { paddingx, paddingy } = style;
        const text = GraphicUtils.createText(value, [paddingx, paddingy], style.textstyle, [0, 0]);
        const coverwidth = text.width + paddingx * 2;
        const coverheight = text.height + paddingy * 2;
        const cover = new pixi_1.Graphics()
            .beginFill(style.color)
            .lineStyle(style.linestyle)
            .drawRoundedRect(0, 0, coverwidth, coverheight, style.radius)
            .endFill();
        const coveredText = new pixi_1.Graphics();
        coveredText.addChild(cover, text);
        const { anchorx, anchory } = style;
        coveredText.position.set(x - cover.width * (anchorx !== null && anchorx !== void 0 ? anchorx : 0), y - cover.height * (anchory !== null && anchory !== void 0 ? anchory : 0));
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
}
exports.GraphicUtils = GraphicUtils;
//# sourceMappingURL=GraphicUtils.js.map