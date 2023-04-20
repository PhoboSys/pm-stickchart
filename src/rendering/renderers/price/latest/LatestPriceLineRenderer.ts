import { IGraphicStorage, RenderingContext, BaseRenderer, GraphicUtils } from '@rendering'
import config from '@config'

import datamath from '@lib/datamath'
import { Graphics, Container, Text } from '@lib/pixi'
import ui from '@lib/ui'
import { USD } from '@constants'

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
            paddingx: 12,
        }

        this.textCoverStyle = {
            color: config.style.linecolor,
            paddingx: 8,
            paddingy: 6,
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
            latestY,
            latest,
        } = context.plotdata

        const {
            width,
            height,
        } = context.screen

        const x = width
        const y = latestY
        const price = latest.value

        const [coveredText, coveredTextState] = this.get('coveredText', () => GraphicUtils.createCoveredText(
            datamath.toFixedPrecision(Number(price), 8),
            [x, y],
            this.textCoverStyle,
        ))
        if (coveredTextState.new) container.addChild(coveredText)

        const textGraphic = <Text>coveredText.getChildAt(1)
        textGraphic.text = ui.currency(price, USD)

        const { paddingx, paddingy } = this.textCoverStyle
        const coverGraphic = <Graphics>coveredText.getChildAt(0)
        coverGraphic.width = textGraphic.width + paddingx * 2
        coverGraphic.height = textGraphic.height + paddingy * 2

        const { anchorx, anchory } = this.textCoverStyle
        coveredText.position.set(
            x - coveredText.width * anchorx,
            y - coveredText.height * anchory
        )

        const padding = coveredText.width + this.lineStyle.paddingx
        const [line, lineState] = this.get('line', () => GraphicUtils.createLine(
            [0, 0],
            [width, 0],
            this.lineStyle,
        ))

        if (lineState.new) container.addChild(line)
        line.position.set(0, y)
        line.width = width - padding

        return container
    }

}
