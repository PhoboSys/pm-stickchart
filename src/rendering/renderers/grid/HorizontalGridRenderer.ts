import { Graphics, Container } from '../../../lib/pixi'
import datamath from '../../../lib/datamath'

import { IGraphicStorage, RenderingContext } from '../..'
import { BaseRenderer, GraphicUtils } from '../..'

export class HorizontalGridRenderer extends BaseRenderer {

    static readonly HORIZONTAL_GRID_ID: symbol = Symbol('HORIZONTAL_GRID_ID')

    private readonly lineStyle: any
    private readonly textStyle: any

    constructor(renderer: IGraphicStorage) {
        super(renderer)

        this.lineStyle = {
            width: 1,
            color: 0x303550,
            alpha: 1,
        }
        this.textStyle = {
            fill: 0xB7BDD7,
            fontWeight: 500,
            fontFamily: 'Gilroy',
            fontSize: 12,
        }
    }

    public get rendererId(): symbol {
        return HorizontalGridRenderer.HORIZONTAL_GRID_ID
    }

    protected update(
        context: RenderingContext,
        container: Container,
    ): Container {
        const result = new Graphics()

        const { width, height } = context.screen
        const { pricerange } = context.plotdata

        const stepsize = datamath.datastep(pricerange)
        const ysteps = datamath.steps(pricerange, stepsize, 20)
        const ys = datamath.scaleReverse(ysteps, pricerange, height)

        for (const idx in ys) {

            const y = ys[idx]

            // Avoid rendering over time axe text
            // 12px size + anchor 1.1
            if (y > (height - 12 + 12 * 1.1)) continue

            result.addChild(
                GraphicUtils.createLine(
                    [0, y],
                    [width, y],
                    this.lineStyle,
                ),
                GraphicUtils.createText(
                    datamath.toFixedScaled(ysteps[idx], stepsize),
                    [width, y],
                    this.textStyle,
                    1.1,
                ),
            )
        }

        return result
    }

}

