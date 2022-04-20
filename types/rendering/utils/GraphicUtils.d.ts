import { Graphics, LineStyle, Text } from '../../lib/pixi';
export declare class GraphicUtils {
    static createCircle([x, y]: [number, number], radius: number, backgroundColor: number): Graphics;
    static createRoundedRect([x1, y1]: [number, number], [width, height]: [number, number], backgroundColor: number, radius: number): Graphics;
    static createLine([x1, y1]: [number, number], [x2, y2]: [number, number], linestyle: LineStyle): Graphics;
    static lineTo(line: Graphics, [x, y]: [number, number], linestyle: LineStyle): Graphics;
    static startLine([x, y]: [number, number], linestyle: LineStyle): Graphics;
    static createText(value: any, [x, y]: [number, number], textstyle: object, anchor: [number, number] | number): Text;
}
