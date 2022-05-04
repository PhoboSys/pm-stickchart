import { Graphics, LineStyle, Text } from '../../lib/pixi';
export declare class GraphicUtils {
    static createCircleIn(target: Graphics, radius: any, style: {
        color: any;
    }): Graphics;
    static createCircle([x, y]: [number, number], radius: number, style: {
        color: any;
    }): Graphics;
    static createTorus([x, y]: [number, number], [innerr, outerr]: [number, number], style: {
        color: any;
    }): Graphics;
    static createRoundedRect([x, y]: [number, number], [width, height]: [number, number], radius: number, style: {
        fill: any;
        linestyle: any;
    }): Graphics;
    static createCoveredIcon([x, y]: [number, number], style: {
        iconstyle: any;
        paddingx: any;
        paddingy: any;
        color: any;
        radius: any;
        anchorx: any;
        anchory: any;
        linestyle: any;
        texture: any;
    }): Graphics;
    static createCoveredText(value: any, [x, y]: [number, number], style: {
        textstyle: any;
        paddingx: any;
        paddingy: any;
        color: any;
        radius: any;
        anchorx: any;
        anchory: any;
        linestyle: any;
    }): Graphics;
    static createVerticalDashLine(// TODO: implement point to point
    x: number, [y1, y2]: [number, number], linestyle: LineStyle & {
        gap: any;
        dash: any;
    }): Graphics;
    static createLine([x1, y1]: [number, number], [x2, y2]: [number, number], linestyle: LineStyle): Graphics;
    static lineTo(line: Graphics, [x, y]: [number, number], linestyle: LineStyle): Graphics;
    static startLine([x, y]: [number, number], linestyle: LineStyle): Graphics;
    static createText(value: any, [x, y]: [number, number], textstyle: object, anchor: [number, number] | number): Text;
}
