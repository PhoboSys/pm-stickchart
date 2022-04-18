import { Graphics } from '../../lib/pixi'
import datamath from '../../lib/datamath'

import { IGraphicRenderer, RenderingContext } from '..'
import { BaseRenderer, GraphicUtils } from '..'

export class VerticalGridRenderer extends BaseRenderer {

    static readonly VERTICAL_GRID_ID: symbol = Symbol('VERTICAL_GRID_ID')

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
        return VerticalGridRenderer.VERTICAL_GRID_ID
    }

    protected create(
        context: RenderingContext,
    ): Graphics {
        const result = new Graphics()

        const xdata = Object.keys(context.chartdata).map(k => Number(k))
        const xrange = datamath.range(xdata, -0.1)
        const xsteps = datamath.steps(xrange)
        const xpercent = datamath.percent(xsteps, xrange)

        const { width, height } = context.screen
        for (const idx in xpercent) {

            const xp = xpercent[idx]

            const x = xp * width

            result.addChild(
                GraphicUtils.createLine(
                    [x, 0],
                    [x, height],
                    this.lineStyle
                ),
                GraphicUtils.createText(
                    xsteps[idx],
                    [x, height],
                    this.textStyle,
                    1.1
                )
            )
        }

        return result
    }

}

