import datamath from '../../lib/datamath'

import { castArray } from 'lodash'

import { Graphics, LineStyle, Text, TextStyle } from '../../lib/pixi'


export class GraphicUtils {

    static createCircle(
        [x, y]: [number, number],
        radius: number,
        style: { color },
    ): Graphics {

        const cirl = new Graphics()
            .beginFill(style.color)
            .drawCircle(0, 0, radius)
            .endFill()

        cirl.position.set(x, y)
        return cirl
    }

    static createTorus(
        [x, y]: [number, number],
        [innerr, outerr]: [number, number],
        style: { color, }
    ) {
        const torus = new Graphics()

        torus
            .beginFill(style.color)
            .drawTorus?.(0, 0, innerr, outerr)
            .endFill()

        torus.position.set(x, y)
        return torus
    }

    static createRoundedRect(
        [x, y]: [number, number],
        [width, height]: [number, number],
        radius: number,
        style: { color }
    ): Graphics {
        const rect = new Graphics()
            .beginFill(style.color)
            .drawRoundedRect(0, 0, width, height, radius)
            .endFill()

        rect.position.set(x, y)
        return rect
    }

    static createCoveredText(
        value: any,
        [x, y]: [number, number],
        style: { textstyle, paddingx, paddingy, color, radius, anchorx, anchory },
    ) {
        const { paddingx, paddingy } = style

        const text = GraphicUtils.createText(
            value,
            [paddingx, paddingy],
            style.textstyle,
            [0, 0]
        )

        const coverwidth = text.width + paddingx * 2
        const coverheight = text.height + paddingy * 2

        const cover = GraphicUtils.createRoundedRect(
            [0, 0],
            [coverwidth, coverheight,],
            style.radius,
            style,
        )

        const coveredText = new Graphics()
        coveredText.addChild(cover, text)

        const { anchorx, anchory } = style
        coveredText.position.set(
            x - cover.width * (anchorx ?? 0),
            y - cover.height * (anchory ?? 0)
        )

        return coveredText
    }

    static createVerticalDashLine( // TODO: implement point to point
        x: number,
        [y1, y2]: [number, number],
        linestyle: LineStyle & { gap, dash }
    ) {
        const dashLine = GraphicUtils.startLine([x, y1], linestyle)

        const ysteps = datamath.steps([y1, y2], linestyle.dash + linestyle.gap)

        for (const ystep of ysteps) {
            if (ystep === y1) continue

            dashLine
                .lineTo(x, ystep - linestyle.gap)
                .moveTo(x, ystep)
        }

        return dashLine
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
