import { ITextStyle } from '@pixi/text'
import { castArray } from 'lodash'

import { Graphics, LineStyle, Text, TextStyle } from '../../lib/pixi'

export class GraphicUtils {

    static createCircle(
        [x, y]: [number, number],
        radius: number,
        backgroundColor: number,
    ): Graphics {

        const cirl = new Graphics()
            .beginFill(backgroundColor)
            .drawCircle(0, 0, radius)
            .endFill()

        cirl.position.set(x, y)
        return cirl
    }

    static createRoundedRect(
        [x, y]: [number, number],
        [width, height]: [number, number],
        { color, radius }
    ): Graphics {
        const rect = new Graphics()
            .beginFill(color)
            .drawRoundedRect(0, 0, width, height, radius)
            .endFill()

        rect.position.set(x, y)
        return rect
    }

    static createCoveredText(
        value: any,
        [x, y]: [number, number],
        textstyle,
        style: { paddingx, paddingy, color, radius, anchorx, anchory },
    ) {
        const { anchorx, anchory } = style

        const text = GraphicUtils.createText(
            value,
            [0, 0],
            textstyle,
            [anchorx, anchory]
        )

        const textx = -text.width * anchorx
        const texty = -text.height * anchory

        const { paddingx, paddingy } = style
        const coverx = textx - paddingx
        const covery = texty - paddingy

        const coverwidth = text.width + paddingx * 2
        const coverheight = text.height + paddingy * 2

        const cover = GraphicUtils.createRoundedRect(
            [coverx, covery,],
            [coverwidth, coverheight,],
            style,
        )

        const coveredText = new Graphics()
        coveredText.addChild(cover, text)
        coveredText.position.set(x, y)
        return coveredText
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
        text.roundPixels = true
        text.resolution = Math.ceil(window.devicePixelRatio)
        text.anchor.set(...castArray(anchor))

        return text

    }
}
