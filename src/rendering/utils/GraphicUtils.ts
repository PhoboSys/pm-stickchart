import { Graphics, LineStyle, Text, TextStyle } from '../../lib/pixi'

export class GraphicUtils {
    static createCircle(
        [x, y]: [number, number],
        radius: number,
        backgroundColor: number,
    ): Graphics {

        const rect = new Graphics()
            .beginFill(backgroundColor)
            .drawCircle(x, y, radius)
            .endFill()

        return rect
    }

    static createRoundedRect(
        [x1, y1]: [number, number],
        [width, height]: [number, number],
        backgroundColor: number,
        radius: number,
    ): Graphics {

        const rect = new Graphics()
            .beginFill(backgroundColor)
            .drawRoundedRect(x1, y1, width, height, radius)
            .endFill()

        return rect
    }

    static createLine(
        [x1, y1]: [number, number],
        [x2, y2]: [number, number],
        linestyle: LineStyle
    ): Graphics {

        const line = (new Graphics())
            .lineStyle(linestyle)
            .moveTo(x1, y1)
            .lineTo(x2, y2)

        return line
    }

    static lineTo(
        line: Graphics,
        [x, y]: [number, number],
        linestyle: LineStyle
    ): Graphics {

        line.lineStyle(linestyle)
            .lineTo(x, y)

        return line
    }

    static startLine(
        [x, y]: [number, number],
        linestyle: LineStyle
    ): Graphics {

        const line = (new Graphics())
            .lineStyle(linestyle)
            .moveTo(x, y)

        return line
    }

    static createText(
        value: any,
        [x, y]: [number, number],
        textstyle: object,
        anchor: [number, number] | number
    ): Text {

        const style = new TextStyle(textstyle)
        const text = new Text(String(value), style)
        text.position.set(x, y)
        // text.roundPixels = true
        if (typeof anchor === 'number') text.anchor.set(anchor)
        else text.anchor.set(...anchor)

        return text

    }
}
