"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphicUtils = void 0;
const lodash_1 = require("lodash");
const datamath_1 = __importDefault(require("../../lib/datamath"));
const pixi_1 = require("../../lib/pixi");
class GraphicUtils {
    static createCircleIn(target, radius, style) {
        target
            .beginFill(style.color)
            .drawCircle(0, 0, radius)
            .endFill();
        return target;
    }
    static createCircle([x, y], radius, style) {
        const cirl = new pixi_1.Graphics()
            .beginFill(style.color)
            .drawCircle(0, 0, radius)
            .endFill();
        cirl.position.set(x, y);
        return cirl;
    }
    static createTorus([x, y], [innerr, outerr], style) {
        var _a, _b;
        const torus = new pixi_1.Graphics();
        (_b = (_a = torus
            .beginFill(style.color)).drawTorus) === null || _b === void 0 ? void 0 : _b.call(_a, 0, 0, innerr, outerr).endFill();
        torus.position.set(x, y);
        return torus;
    }
    static createRoundedRect([x, y], [width, height], radius, style) {
        const rect = new pixi_1.Graphics()
            .beginFill(style.fill)
            .lineStyle(style.linestyle)
            .drawRoundedRect(0, 0, width, height, radius)
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
        const cover = GraphicUtils.createRoundedRect([0, 0], [coverwidth, coverheight], style.radius, {
            fill: style.color,
            linestyle: style.linestyle,
        });
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
        const cover = GraphicUtils.createRoundedRect([0, 0], [coverwidth, coverheight], style.radius, {
            fill: style.color,
            linestyle: style.linestyle,
        });
        const coveredText = new pixi_1.Graphics();
        coveredText.addChild(cover, text);
        const { anchorx, anchory } = style;
        coveredText.position.set(x - cover.width * (anchorx !== null && anchorx !== void 0 ? anchorx : 0), y - cover.height * (anchory !== null && anchory !== void 0 ? anchory : 0));
        return coveredText;
    }
    static createVerticalDashLine(// TODO: implement point to point
    x, [y1, y2], linestyle) {
        const dashLine = GraphicUtils.startLine([x, y1], linestyle);
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
    static lineTo(line, [x, y], linestyle) {
        line.lineStyle(linestyle)
            .lineTo(x, y);
        return line;
    }
    static startLine([x, y], linestyle) {
        const line = (new pixi_1.Graphics())
            .lineStyle(linestyle)
            .moveTo(x, y);
        return line;
    }
    static createText(value, [x, y], textstyle, anchor) {
        const style = new pixi_1.TextStyle(textstyle);
        const text = new pixi_1.Text(String(value), style);
        text.position.set(x, y);
        text.roundPixels = true;
        text.resolution = Math.ceil(window.devicePixelRatio);
        text.anchor.set(...(0, lodash_1.castArray)(anchor));
        return text;
    }
}
exports.GraphicUtils = GraphicUtils;
//# sourceMappingURL=GraphicUtils.js.map