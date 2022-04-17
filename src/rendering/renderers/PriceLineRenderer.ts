import { Graphics, LineStyle } from '../../lib/pixi'

import { IGraphicRenderer, RenderingContext } from '..'
import { BaseRenderer, GraphicUtils } from '..'

export class PriceLineRenderer extends BaseRenderer {

    static readonly PRICE_LINE_ID: string = 'PRICE_LINE_ID'

    private readonly lineStyle: any

    constructor(renderer: IGraphicRenderer) {
        super(renderer)
        this.lineStyle = {
            width: 3,
            color: 0x009797,
            alpha: 1,
            join: 'round',
            cap: 'round',
        }
    }

    public get rendererId() {
        return PriceLineRenderer.PRICE_LINE_ID
    }

    private convert(
        pricepoint: number,
        timestamp: number,
        context: RenderingContext,
    ): [number, number] {

        return [
            1000*Math.random(),
            1000*Math.random()
        ]

    }

    protected create(
        context: RenderingContext,
    ): Graphics {
        let result = GraphicUtils.startLine([0, 0], this.lineStyle)

        const { chartdata } = context
        for (const timestamp in chartdata) {
            const pricepoint = chartdata[timestamp]

            const point = this.convert(pricepoint, +timestamp, context)
            result = GraphicUtils.lineTo(result, point, this.lineStyle)
        }

        return result
    }


}
