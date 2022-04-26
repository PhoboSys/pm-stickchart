import { IGraphicRenderer, RenderingContext, BaseRenderer, GraphicUtils } from '..'
import datamath from '../../lib/datamath'
import { Graphics } from '../../lib/pixi'
import { DateUtils } from '../utils/DateUtils'

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

    public get rendererId(): symbol {
        return VerticalGridRenderer.VERTICAL_GRID_ID
    }

    protected create(
        context: RenderingContext,
    ): Graphics {
        const result = new Graphics()

        const { width, height } = context.screen
        const { xdata, xrange } = context.plotdata

        const stepsize = context.pool.duration
        const xsteps = datamath.steps(xrange, stepsize, 20)
        const xs = datamath.scale(xsteps, xrange, width)

        for (const idx in xs) {

            const x = xs[idx]

            result.addChild(
                GraphicUtils.createLine(
                    [x, 0],
                    [x, height],
                    this.lineStyle,
                ),
                GraphicUtils.createText(
                    DateUtils.formatUnixTSToHHmm(xsteps[idx]),
                    [x, height],
                    this.textStyle,
                    1.1,
                ),
            )
        }

        return result
    }

}

