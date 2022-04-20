import { Graphics, LineStyle, Text } from '../../lib/pixi';
export declare class GraphicUtils {
    static createCircle([x, y]: [number, number], radius: number, style: {
        color: any;
    }): Graphics;
    static createTorus([x, y]: [number, number], [innerr, outerr]: [number, number], style: {
        color: any;
    }): Graphics;
    static createRoundedRect([x, y]: [number, number], [width, height]: [number, number], radius: number, style: {
        color: any;
    }): Graphics;
    static createCoveredText(value: any, [x, y]: [number, number], style: {
        textstyle: any;
        paddingx: any;
        paddingy: any;
        color: any;
        radius: any;
        anchorx: any;
        anchory: any;
    }): Graphics;
    static createDashLine(// TODO
    [x1, y1]: [number, number], [x2, y2]: [number, number], linestyle: LineStyle & {
        gap: any;
        dash: any;
    }): Graphics;
    static createLine([x1, y1]: [number, number], [x2, y2]: [number, number], linestyle: LineStyle): Graphics;
    static lineTo(line: Graphics, [x, y]: [number, number], linestyle: LineStyle): Graphics;
    static startLine([x, y]: [number, number], linestyle: LineStyle): Graphics;
    static createText(value: any, [x, y]: [number, number], textstyle: object, anchor: [number, number] | number): Text;
}
