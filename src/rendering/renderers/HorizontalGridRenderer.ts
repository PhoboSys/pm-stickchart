import { IGraphicStorage, RenderingContext } from '..'
import { BaseRenderer, GraphicUtils } from '..'
import datamath from '../../lib/datamath'
import { Graphics, Container } from '../../lib/pixi'

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
        const { ydata, yrange } = context.plotdata

        const stepsize = datamath.datastep(yrange)
        const ysteps = datamath.steps(yrange, stepsize, 20)
        const ys = datamath.scale(ysteps, yrange, height)

        for (const idx in ys) {

            // Avoid rendering over time axe text
            // 12px size + anchor 1.1
            if (ys[idx] <= 12 + 12 * 1.1) continue

            const y = height - ys[idx]

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

