import { IGraphicStorage, RenderingContext, BaseRenderer, GraphicUtils } from '@rendering'
import config from '@config'

import { Container } from '@lib/pixi'
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
            paddingx: 16,
        }

        this.textCoverStyle = {
            color: 0x071226,
            padding: [6, 8],
            anchor: [1.1, 0.5],
            radius: 30,
            textstyle: {
                fill: 0xFFFFFF,
                fontWeight: 500,
                fontFamily: 'Roboto',
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
        } = context.screen

        const x = width
        const y = latestY
        const price = latest.value

        const [coveredText, coveredTextState] = this.get('coveredText', () => GraphicUtils.createCoveredText(
            ui.currency(price, USD),
            [x, y],
            this.textCoverStyle,
        ))

        if (coveredTextState.new) container.addChild(coveredText)
        else coveredText.update((textGraphic) => textGraphic.text = ui.currency(price, USD), [x, y], this.textCoverStyle)

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
