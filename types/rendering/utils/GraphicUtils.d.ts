import { Graphics, LineStyle, Text } from '../../lib/pixi';
import { Texture, Container } from '../../lib/pixi';
export declare class CoveredText extends Graphics {
    update(updater: (textGraphic: Text, coverGraphic: Graphics) => void, position: [number, number], style: {
        padding: any;
        anchor: any;
    }): void;
    private updateText;
    private updatePosition;
}
export declare class GraphicUtils {
    static createCircle([x, y]: [number, number], radius: number, { color, alpha }: {
        color: any;
        alpha?: any;
    }): Graphics;
    static createTorus([x, y]: [number, number], [innerr, outerr]: [number, number], style: {
        color: any;
    }): Graphics;
    static createRoundedRect([x, y]: [number, number], [width, height]: [number, number], [r1, r2, r3, r4]: [number, number, number, number], { texture, color, lineStyle, alpha }?: {
        texture?: any;
        color?: any;
        lineStyle?: any;
        alpha?: any;
    }, rect?: Graphics): Graphics;
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
        padding: any;
        color: any;
        alpha: any;
        radius: any;
        anchor: any;
        linestyle: any;
    }): CoveredText;
    static createVerticalDashLine(x: number, [y1, y2]: [number, number], linestyle: LineStyle & {
        gap: any;
        dash: any;
    }): Graphics;
    static createTexturedVerticalDashLine(x: number, [y1, y2]: [number, number], linestyle: LineStyle & {
        gap: any;
        dash: any;
        texture: Texture;
    }): Graphics;
    static createLine([x1, y1]: [number, number], [x2, y2]: [number, number], linestyle: LineStyle): Graphics;
    static createText(value: any, [x, y]: [number, number], textstyle: object, anchor?: [number, number] | number): Text;
    static createPropagationBackground({ lineHeight, width, height, colors, duration }: {
        lineHeight: any;
        width: any;
        height: any;
        colors: any;
        duration: any;
    }): [Container, gsap.core.Timeline];
}
