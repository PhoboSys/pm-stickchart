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

        const data = Object.keys(context.chartdata).map(k => Number(k))
        const range = datamath.range(data)
        const datasteps = datamath.steps(range)
        const percentsteps = datamath.percent(datasteps, range)

        const { width, height } = context.screen
        for (const idx in percentsteps) {
            const percent = percentsteps[idx]
            const value = datasteps[idx]
            if (percent > 0 && percent < 1) {
                const x = (1 - percent) * width
                result.addChild(
                    GraphicUtils.createLine(
                        [x, 0],
                        [x, height],
                        this.lineStyle
                    ),
                    GraphicUtils.createText(
                        new Date(value * 1000).toLocaleDateString("en-US"),
                        [x, height],
                        this.textStyle,
                        1.1
                    )
                )
            }
        }

        return result
    }

}

