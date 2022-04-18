import { Graphics } from '../../lib/pixi'
import datamath from '../../lib/datamath'

import { IGraphicRenderer, RenderingContext } from '..'
import { BaseRenderer, GraphicUtils } from '..'

export class HorizontalGridRenderer extends BaseRenderer {

    static readonly HORIZONTAL_GRID_ID: symbol = Symbol('HORIZONTAL_GRID_ID')

    private readonly lineStyle: any
    private readonly textStyle: any

    constructor(renderer: IGraphicRenderer) {
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

    public get rendererId() {
        return HorizontalGridRenderer.HORIZONTAL_GRID_ID
    }

    protected create(
        context: RenderingContext
    ): Graphics {
        const result = new Graphics()

        const ydata = Object.values(context.chartdata)
        const yrange = datamath.range(ydata)
        const ysteps = datamath.steps(yrange)
        const ypercent = datamath.percent(ysteps, yrange)

        const { width, height } = context.screen
        for (const idx in ypercent) {

            const yp = ypercent[idx]

            const y = (1 - yp) * height

            result.addChild(
                GraphicUtils.createLine(
                    [0, y],
                    [width, y],
                    this.lineStyle
                ),
                GraphicUtils.createText(
                    ysteps[idx],
                    [width, y],
                    this.textStyle,
                    1.1
                )
            )
        }

        return result
    }

}


