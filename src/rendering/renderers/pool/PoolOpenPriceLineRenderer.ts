import config from '../../../config'
import { IGraphicStorage, RenderingContext } from '../..'
import { BaseRenderer, GraphicUtils } from '../..'

import datamath from '../../../lib/datamath'
import { Graphics, Container, Text } from '../../../lib/pixi'
import ui from '../../../lib/ui/index'
import { USD } from '../../../constants/currencies'
export class PoolOpenPriceLineRenderer extends BaseRenderer {

    static readonly POOL_OPEN_PRICE_LINE_ID: symbol = Symbol('POOL_OPEN_PRICE_LINE_ID')

    private lineStyle: any

    private torusStyle: any

    private textStyle: any

    private coverStyle: any

    constructor(renderer: IGraphicStorage) {
        super(renderer)

        this.coverStyle = {
            paddingx: 8,
            paddingy: 5,

            paddingRight: 10,

            radius: 30,
            color: 0x22273F,

            lineStyle: {
                color: 0xB7BDD7,
                width: 2,
            }
        }

        this.textStyle = {
            fill: 0xB7BDD7,
            fontWeight: 600,
            fontFamily: 'Gilroy',
            fontSize: 13,
        }

        this.torusStyle = {
            innerr: 3,
            outerr: 6,
            innerColor: 0x303550,
            outerColor: 0xB7BDD7,
        }

        this.lineStyle = {
            color: 0xB7BDD7,
            width: 1,
            alpha: 0.7,
        }
    }

    public get rendererId(): symbol {
        return PoolOpenPriceLineRenderer.POOL_OPEN_PRICE_LINE_ID
    }

    protected update(
        context: RenderingContext,
        container: Container,
    ): Container {
        if (!context?.pool?.openPrice) {
            container.alpha = 0

            return container
        }

        container.alpha = 1

        this.updatePriceLine(context, container)

        return container
    }

    private updatePriceLine(context: RenderingContext, container: Container): Container {

        const {
            timerange,
            pricerange,
        } = context.plotdata

        const {
            width,
            height,
        } = context.screen

        const { openPrice: openDataPoint } = context.pool

        const [x] = datamath.scale([openDataPoint.timestamp], timerange, width)
        const [y] = datamath.scaleReverse([openDataPoint.value], pricerange, height)

        const [point, pointstate] = this.get('point', () => this.createPricePoint())
        point.position.set(x, y)

        const priceValue = ui.currency(openDataPoint.value, USD)
        const [coveredText, coveredTextState] = this.get('cover', () => this.createPriceText(priceValue))

        const textGraphic = <Text>coveredText.getChildAt(1)
        textGraphic.text = priceValue

        const { paddingx, paddingy } = this.coverStyle
        const coverGraphic = <Graphics>coveredText.getChildAt(0)

        const coverWidth = textGraphic.width + paddingx * 2
        const coverHeight = textGraphic.height + paddingy * 2

        coverGraphic.width = coverWidth
        coverGraphic.height = coverHeight

        coverGraphic.position.x = -coverWidth
        textGraphic.position.x = -coverWidth + paddingx

        coveredText.position.set(width - this.coverStyle.paddingRight, y)

        const [line, linestate] = this.get('line', () => GraphicUtils.createLine(
            [0, 0],
            [width, 0],
            this.lineStyle,
        ))

        line.position.set(0, y)
        line.width = coveredText.position.x

        if (linestate.new) container.addChild(line)
        if (pointstate.new) container.addChild(point)
        if (coveredTextState.new) container.addChild(coveredText)

        return container
    }

    private createPriceText(priceValue): Container {
        const { paddingx, paddingy } = this.coverStyle

        const text = new Text(priceValue, this.textStyle)
        text.position.set(paddingx, paddingy)

        const width = text.width + paddingx * 2
        const height = text.height + paddingy * 2

        const { radius, color } = this.coverStyle
        const cover = new Graphics()
            .beginFill(color)
            .lineStyle(this.coverStyle.lineStyle)
            .drawRoundedRect(0, 0, width, height, radius)
            .endFill()

        text.position.x = -width + paddingx
        cover.position.x = -width

        text.position.y = -height / 2 + paddingy
        cover.position.y = -height / 2

        const coveredText = new Container()
        coveredText.addChild(cover, text)

        return coveredText
    }

    private createPricePoint(): Container {
        const inner = GraphicUtils.createCircle(
            [0, 0],
            this.torusStyle.innerr,
            { color: this.torusStyle.innerColor }
        )

        const outer = GraphicUtils.createCircle(
            [0, 0],
            this.torusStyle.outerr,
            { color: this.torusStyle.outerColor }
        )

        const pointer = new Container()
        pointer.addChild(outer, inner)

        return pointer
    }

}
