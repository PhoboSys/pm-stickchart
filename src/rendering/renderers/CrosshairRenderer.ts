import { IGraphicStorage, RenderingContext } from '..'
import { BaseRenderer, GraphicUtils } from '..'

import datamath from '../../lib/datamath'
import { Graphics, Container } from '../../lib/pixi'

export class CrosshairRenderer extends BaseRenderer {

    static readonly CROSSHAIR_ID: symbol = Symbol('CROSSHAIR_ID')

    private readonly lineStyle: any

    private readonly priceCoverStyle: any

    constructor(renderer: IGraphicStorage) {
        super(renderer)

        this.lineStyle = {
            width: 2,
            color: 0x009797,
            alpha: 1,
            join: 'round',
            cap: 'round',
        }

        this.priceCoverStyle = {
            color: 0x009797,
            paddingright: 5,
            paddingx: 5,
            paddingy: 2.5,
            anchorx: 1,
            anchory: 0.5,
            radius: 30,
            textstyle: {
                fill: 0xFFFFFF,
                fontWeight: 600,
                fontFamily: 'Gilroy',
                fontSize: 13,
            },
        }
    }

    public get rendererId(): symbol {
        return CrosshairRenderer.CROSSHAIR_ID
    }

    protected update(
        context: RenderingContext,
        container: Container,
    ): Container {
        if (!context.mousepos) return new Graphics()

        const {
            height,
            width,
        } = context.screen

        const {
            xrange,
            yrange,
        } = context.plotdata

        const { x, y } = context.mousepos

        const verticalLine = GraphicUtils.createLine(
            [x, 0],
            [x, height],
            this.lineStyle,
        )

        const pricedif = yrange[1] - yrange[0]
        const price = yrange[1] - datamath.scale([y], [0, height], pricedif)[0]

        const { paddingright } = this.priceCoverStyle
        const priceText = GraphicUtils.createCoveredText(
            price.toFixed(3),
            [width - paddingright, y],
            this.priceCoverStyle,
        )

        const horizontalLine = GraphicUtils.createLine(
            [0, y],
            [priceText.x, y],
            this.lineStyle,
        )

        const result = new Graphics()

        result.addChild(verticalLine, horizontalLine, priceText)

        return result
    }

}
