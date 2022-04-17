import { Graphics, LineStyle } from '../../lib/pixi'
import datamath from '../../lib/datamath'

import { IGraphicRenderer, RenderingContext } from '..'
import { BaseRenderer, GraphicUtils } from '..'

export class HorizontalGridRenderer extends BaseRenderer {

    static readonly HORIZONTAL_GRID_ID: string = 'HORIZONTAL_GRID_ID'

    private readonly lineStyle: any
    private readonly textStyle: any

    constructor(renderer: IGraphicRenderer) {
        super(renderer)
        this.lineStyle = {
            width: 1,
            color: 0xFFFFFF,
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

        const data = Object.values(context.chartdata)
        const range = datamath.range(data)
        const datasteps = datamath.steps(range)
        const percentsteps = datamath.percent(datasteps, range)
        const { width, height } = context.screen
        for (const idx in percentsteps) {
            const percent = percentsteps[idx]
            const value = datasteps[idx]
            if (percent > 0 && percent < 1) {
                const y = (1 - percent) * height
                result.addChild(
                    GraphicUtils.createLine(
                        [0, y],
                        [width, y],
                        this.lineStyle
                    ),
                    GraphicUtils.createText(
                        value,
                        [width, y],
                        this.textStyle,
                        1
                    )
                )
            }
        }

        return result
    }

}


