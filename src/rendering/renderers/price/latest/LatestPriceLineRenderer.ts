import { IGraphicStorage, RenderingContext } from '../../..'
import { BaseRenderer, GraphicUtils } from '../../..'
import config from '../../../../config'

import datamath from '../../../../lib/datamath'
import { Graphics, Container, Text, gsap } from '../../../../lib/pixi'

export class LatestPriceLineRenderer extends BaseRenderer {

    static readonly LATEST_PRICE_LINE_ID: symbol = Symbol('LATEST_PRICE_LINE_ID')

    private readonly lineStyle: any

    private readonly textCoverStyle: any

    constructor(renderer: IGraphicStorage) {
        super(renderer)

        this.lineStyle = {
            width: 2,
            color: config.style.linecolor,
            alpha: 1,
            join: 'round',
            cap: 'round',
            paddingx: 16,
        }

        this.textCoverStyle = {
            color: config.style.linecolor,
            paddingx: 7,
            paddingy: 5,
            anchorx: 1.1,
            anchory: 0.5,
            radius: 30,
            textstyle: {
                fill: 0xFFFFFF,
                fontWeight: 600,
                fontFamily: 'Gilroy',
                fontSize: 13,
            },
            linestyle: {
                color: config.style.linecolor,
                width: 1,
            },
        }
    }

    public get rendererId(): symbol {
        return LatestPriceLineRenderer.LATEST_PRICE_LINE_ID
    }

    protected update(
        context: RenderingContext,
        container: Container,
    ): Container {

        const {
            ys,
            ydata,
        } = context.plotdata

        const {
            width,
            height,
        } = context.screen

        const x = width
        const y = Number(ys.at(-1))
        const price = Number(ydata.at(-1))

        const [coveredText, coveredTextState] = this.get('coveredText', () => GraphicUtils.createCoveredText(
            datamath.toFixedPrecision(price, 8),
            [x, y],
            this.textCoverStyle,
        ))
        if (coveredTextState.new) container.addChild(coveredText)

        const textGraphic = <Text>coveredText.getChildAt(1)
        textGraphic.text = datamath.toFixedPrecision(price, 8)

        const { anchorx, anchory } = this.textCoverStyle
        coveredTextState.timeline?.kill()
        coveredTextState.timeline = gsap.to(coveredText, {
            pixi: {
                positionX: x - coveredText.width * anchorx,
                positionY: y - coveredText.height * anchory,
            },
            duration: 0.3,
            ease: 'power4.out',
        })

        const padding = coveredText.width + this.lineStyle.paddingx
        const [line, lineState] = this.get('line', () => GraphicUtils.createLine(
            [0, 0],
            [x, 0],
            this.lineStyle,
        ))

        if (lineState.new) {
            container.addChild(line)
            line.position.set(0, y)
        }
        line.width = width - padding

        lineState.timeline?.kill()
        lineState.timeline = gsap.to(line, {
            pixi: {
                positionX: 0,
                positionY: y
            },
            duration: 0.3,
            ease: 'power4.out',
        })

        return container
    }

}
