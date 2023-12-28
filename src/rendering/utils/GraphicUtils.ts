import { castArray } from 'lodash'

import { Logger } from '@infra'

import datamath from '@lib/datamath'
import { Graphics, LineStyle, Text, TextStyle } from '@lib/pixi'
import { Sprite, Texture, Matrix, Container, gsap } from '@lib/pixi'

export class CoveredText extends Graphics {

    public update(
        updater: (textGraphic: Text, coverGraphic: Graphics ) => void,
        position: [number, number],
        style: { padding, anchor },
    ): void {
        this.updateText(updater, style)
        this.updatePosition(position, style)
    }

    private updateText(updater: (textGraphic: Text, coverGraphic: Graphics) => void, style: { padding }): void {
        const coverGraphic = <Graphics> this.getChildAt(0)
        const textGraphic = <Text> this.getChildAt(1)

        updater(textGraphic, coverGraphic)

        const { padding = [0, 0] } = style
        const [topPadding, rightPadding, bottomPadding = topPadding, leftPadding = rightPadding] = padding

        coverGraphic.width = textGraphic.width + leftPadding + rightPadding
        coverGraphic.height = textGraphic.height + topPadding + bottomPadding
    }

    private updatePosition([x, y], style: { anchor }): void {
        const { anchor = [0, 0] } = style
        this.position.set(x - this.width * anchor[0], y - this.height * anchor[1])
    }
}
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
        { texture, color, lineStyle, alpha = 1 }: { texture?, color?, lineStyle?, alpha? } = {},
        rect?: Graphics,
    ): Graphics {
        rect = rect ?? new Graphics()

        rect.lineStyle({ width: 1, alpha: 0, ...lineStyle })

        if (texture) {
            const matrix = new Matrix()
            matrix.tx = x
            matrix.ty = y
            rect.beginTextureFill({ texture, alpha, matrix })
        } else {
            rect.beginFill(color, alpha)
        }

        rect
            .moveTo(0+x, r1+y)
            .arcTo(0+x, 0+y, r1+x, 0+y, r1)

            .lineTo(width+x - r2, 0+y)
            .arcTo(width+x, 0+y, width+x, r2+y, r2)

            .lineTo(width+x, height+y - r3)
            .arcTo(width+x, height+y, width+x - r3, height+y, r3)

            .lineTo(r4+x, height+y)
            .arcTo(0+x, height+y, 0+x, height+y - r4, r4)

            .closePath()
            .endFill()

        // rect.position.set(x, y)

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
        style: { textstyle, padding, color, alpha, radius, anchor, linestyle },
    ): CoveredText {
        const { padding = [0, 0] } = style

        const [topPadding, rightPadding, bottomPadding = topPadding, leftPadding = rightPadding] = padding

        const text = GraphicUtils.createText(
            value,
            [leftPadding, topPadding],
            style.textstyle,
            [0, 0],
        )

        const coverwidth = text.width + leftPadding + rightPadding
        const coverheight = text.height + topPadding + bottomPadding

        const cover = new Graphics()
            .beginFill(style.color, style.alpha)
            .lineStyle(style.linestyle)
            .drawRoundedRect(0, 0, coverwidth, coverheight, style.radius)
            .endFill()

        const coveredText = new CoveredText()

        coveredText.addChild(cover, text)

        const { anchor = [0, 0] } = style
        coveredText.position.set(
            x - cover.width * (anchor[0] ?? 0),
            y - cover.height * (anchor[1] ?? 0),
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

    static createPropagationBackground({
        lineHeight,
        width,
        height,
        colors,
        duration
    }): Container {
        if (colors.length === 1) {
            colors.push({ color: 0xffffff, alpha: 0 })
        }

        const container = new Container()
        const lines = new Graphics()
        const mask = new Graphics()
        mask
            .beginFill()
            .drawRect(0, 0, width, height)
            .endFill()

        container.addChild(lines)
        container.mask = mask
        container.addChild(mask)

        const colorsSize = colors.length
        const linesSize = Math.ceil(height / lineHeight) + colorsSize
        for (let i = 0; i < linesSize; i++) {
            const color = colors[i%colorsSize]
            lines.beginFill(color.color, color.alpha === undefined ? 1 : color.alpha)
            lines.drawRect(0, i * lineHeight, width, lineHeight)
            lines.endFill()
        }

        gsap.to(lines, {
            pixi: { y: -1 * colorsSize * lineHeight },
            duration,
            repeat: -1,
            ease: 'power0',
        })

        return container
    }
}
