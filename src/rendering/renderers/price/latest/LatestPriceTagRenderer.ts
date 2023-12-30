import { IGraphicStorage, RenderingContext, BaseRenderer, GraphicUtils } from '@rendering'
import config from '@config'

import { Container } from '@lib/pixi'
import ui from '@lib/ui'
import { USD } from '@constants'

export class LatestPriceTagRenderer extends BaseRenderer {

    static readonly LATEST_PRICE_TAG_ID: symbol = Symbol('LATEST_PRICE_TAG_ID')

    private readonly lineStyle: any

    private readonly textCoverStyle: any

    constructor(renderer: IGraphicStorage) {
        super(renderer)

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
        return LatestPriceTagRenderer.LATEST_PRICE_TAG_ID
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

        return container
    }

}

