import config from '@config'

import { Container } from '@lib/pixi'
import datamath from '@lib/datamath'
import ui from '@lib/ui'

import { RenderingContext } from '@rendering'
import { BaseRenderer, GraphicUtils } from '@rendering'

export class VerticalGridRenderer extends BaseRenderer {

    static readonly VERTICAL_GRID_ID: symbol = Symbol('VERTICAL_GRID_ID')

    private readonly lineStyle: any = {
        width: 1,
        color: 0xFFFFFF,
        alpha: 0.05,
    }

    private readonly textStyle: any = {
        fill: 0xB7BDD7,
        fontWeight: 400,
        fontFamily: 'Roboto',
        fontSize: config.grid.time.fontsize,
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

        const stepsize = context.game.schedule
        const timesteps = datamath.steps(timerange, stepsize, config.grid.time.max)
        const xs = datamath.scale(timesteps, timerange, width)

        const outsideX = -100
        let idx = 0
        // create a set lines and texts and reuse them
        // fix GL_OUT_OF_MEMORY
        while (idx++ < config.grid.time.max*2) {
            this.rebind(idx)

            const x = xs[idx] || outsideX
            const time = timesteps[idx] || 0

            const [line, lineState] = this.get('x_gridline', () => GraphicUtils.createLine(
                [0, 0],
                [0, height],
                this.lineStyle,
            ))
            if (lineState.new) container.addChild(line)
            line.position.set(x, 0)
            line.height = height

            const time24 = ui.time24(time)
            const [text, textState] = this.get('x_gridtext', () => GraphicUtils.createText(
                time24,
                [x, height],
                this.textStyle,
                1.1,
            ))
            if (textState.new) container.addChild(text)
            text.position.set(x, height)
            text.text = time24

        }

        return container
    }

}

