import { castArray } from 'lodash'

import { Logger } from '../../infra'

import datamath from '../../lib/datamath'
import { Graphics, LineStyle, Text, TextStyle, Sprite, Texture } from '../../lib/pixi'

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
        style: { color },
    ): Graphics {

        const torus = new Graphics()
        torus.beginFill(style.color)
        if (torus.drawTorus) torus.drawTorus(0, 0, innerr, outerr)
        else Logger.error('drawTorus is not supported install @pixi/graphics-extras')
        torus.endFill()

        torus.position.set(x, y)

        return torus
    }

    static createRoundedRect(
        [x, y]: [number, number],
        [width, height]: [number, number],
        [r1, r2, r3, r4]: [number, number, number, number],
        { texture, color, lineStyle, alpha = 1 }: { texture?, color?, lineStyle?, alpha? }
    ): Graphics {
        const rect = new Graphics()
            .lineStyle({ width: 1, alpha: 0, ...(lineStyle ?? {}) })

        if (texture) rect.beginTextureFill({ texture, alpha })
        else rect.beginFill(color, alpha)

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
            .endFill()

        rect.position.set(x, y)

        return rect
    }

    static createCoveredIcon(
        [x, y]: [number, number],
        style: { iconstyle, paddingx, paddingy, color, radius, anchorx, anchory, linestyle, texture },
    ): Graphics {

        const { paddingx, paddingy } = style

        const icon = new Sprite(style.texture)
        const scale = style.iconstyle.size / icon.height

        icon.position.set(
            paddingx,
            paddingy,
        )
        icon.scale.set(
            scale,
        )

        const coverwidth = icon.width + paddingx * 2
        const coverheight = icon.height + paddingy * 2

        const cover = new Graphics()
            .beginFill(style.color)
            .lineStyle(style.linestyle)
            .drawRoundedRect(0, 0, coverwidth, coverheight, style.radius)
            .endFill()

        const result = new Graphics()

        result.addChild(cover, icon)

        const { anchorx, anchory } = style

        result.position.set(
            x - cover.width * (anchorx ?? 0),
            y - cover.height * (anchory ?? 0),
        )

        return result
    }

    static createCoveredText(
        value: any,
        [x, y]: [number, number],
        style: { textstyle, paddingx, paddingy, color, radius, anchorx, anchory, linestyle },
    ): Graphics {
        const { paddingx, paddingy } = style

        const text = GraphicUtils.createText(
            value,
            [paddingx, paddingy],
            style.textstyle,
            [0, 0],
        )

        const coverwidth = text.width + paddingx * 2
        const coverheight = text.height + paddingy * 2

        const cover = new Graphics()
            .beginFill(style.color)
            .lineStyle(style.linestyle)
            .drawRoundedRect(0, 0, coverwidth, coverheight, style.radius)
            .endFill()

        const coveredText = new Graphics()

        coveredText.addChild(cover, text)
        const { anchorx, anchory } = style

        coveredText.position.set(
            x - cover.width * (anchorx ?? 0),
            y - cover.height * (anchory ?? 0),
        )

        return coveredText
    }

    static createVerticalDashLine(
        x: number,
        [y1, y2]: [number, number],
        linestyle: LineStyle & { gap, dash },
    ): Graphics {

        const dashLine = new Graphics()
            .lineStyle(linestyle)
            .moveTo(x, y1)

        const maxsteps = 100
        const stepsize = linestyle.dash + linestyle.gap

        const ysteps = datamath.steps(
            [y1 + stepsize, y2 - stepsize],
            stepsize,
            maxsteps,
        )

        for (const ystep of ysteps) {
            if (ystep === y1) continue

            dashLine
                .lineTo(x, ystep - linestyle.gap)
                .moveTo(x, ystep)
        }

        return dashLine
    }

    static createTexturedVerticalDashLine(
        x: number,
        [y1, y2]: [number, number],
        linestyle: LineStyle & { gap, dash, texture: Texture },
    ): Graphics {

        const dashLine = new Graphics()
            .lineStyle(linestyle)
            .beginTextureFill({ texture: linestyle.texture })
            .moveTo(x, y1)

        const maxsteps = 100
        const stepsize = linestyle.dash + linestyle.gap

        const ysteps = datamath.steps(
            [y1 + stepsize, y2 - stepsize],
            stepsize,
            maxsteps,
        )

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
        linestyle: LineStyle,
    ): Graphics {

        const line = (new Graphics())
            .lineStyle(linestyle)
            .moveTo(x1, y1)
            .lineTo(x2, y2)

        return line
    }

    static createText(
        value: any,
        [x, y]: [number, number],
        textstyle: object,
        anchor: [number, number] | number = 0,
    ): Text {

        const style = new TextStyle(textstyle)
        const text = new Text(String(value), style)

        text.position.set(x, y)
        text.roundPixels = false
        text.resolution = Math.ceil(window.devicePixelRatio)
        text.anchor.set(...castArray(anchor))

        return text

    }
}
