import { Graphics, Container } from '../../../lib/pixi'
import datamath from '../../../lib/datamath'
import config from '../../../config'

import { IGraphicStorage, RenderingContext } from '../..'
import { BaseRenderer, GraphicUtils } from '../..'
import { DateUtils } from '../../utils/DateUtils';

export class VerticalGridRenderer extends BaseRenderer {

    static readonly VERTICAL_GRID_ID: symbol = Symbol('VERTICAL_GRID_ID')

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
            fontSize: config.grid.time.fontsize,
        }
    }

    public get rendererId(): symbol {
        return VerticalGridRenderer.VERTICAL_GRID_ID
    }

    protected update(
        context: RenderingContext,
        container: Container,
    ): Container {

        const { width, height } = context.screen
        const { timerange } = context.plotdata

        const stepsize = context.pool.duration
        const timesteps = datamath.steps(timerange, stepsize, config.grid.time.max)
        const xs = datamath.scale(timesteps, timerange, width)

        const outsideX = -100
        let idx = 0
        // create a set lines and texts and reuse them
        // fix GL_OUT_OF_MEMORY
        while (idx++ < config.grid.time.max*2) {

            const x = xs[idx] || outsideX
            const time = timesteps[idx] || 0

            const [line, lineState] = this.get('x_gridline'+idx, () => GraphicUtils.createLine(
                [0, 0],
                [0, height],
                this.lineStyle,
            ))
            if (lineState.new) container.addChild(line)
            line.position.set(x, 0)

            const [text, textState] = this.get('x_gridtext'+idx, () => GraphicUtils.createText(
                DateUtils.formatUnixTSToHHmm(time),
                [x, height],
                this.textStyle,
                1.1,
            ))
            if (textState.new) container.addChild(text)
            text.position.set(x, height)
            text.text = DateUtils.formatUnixTSToHHmm(time)

        }

        return container
    }

}

