import { Graphics, LineStyle } from '../../lib/pixi'

import { IGraphicRenderer, RenderingContext } from '..'
import { BaseRenderer, GraphicUtils } from '..'

export class VerticalGridRenderer extends BaseRenderer {

    static readonly VERTICAL_GRID_ID: string = 'VERTICAL_GRID_ID'

    private readonly lineStyle: any

    constructor(renderer: IGraphicRenderer) {
        super(renderer)
        this.lineStyle = {
            width: 1,
            color: 0xFFFFFF,
            alpha: 1,
        }
    }

    public get rendererId() {
        return VerticalGridRenderer.VERTICAL_GRID_ID
    }

    protected create(
        context: RenderingContext,
    ): Graphics {
        const result = new Graphics()

        const { height } = context.screen
        let x = 0
        for (let i = 0; i < 10; i++) {
            x += 100 * Math.random()
            result.addChild(
                GraphicUtils.createLine([x, 0], [x, height], this.lineStyle)
            )
        }

        return result
    }

}

