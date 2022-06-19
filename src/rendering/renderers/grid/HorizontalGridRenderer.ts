import { Container } from '@lib/pixi'
import datamath from '@lib/datamath'
import config from '@config'

import { IGraphicStorage, RenderingContext } from '@rendering'
import { BaseRenderer, GraphicUtils } from '@rendering'

import ui from '@lib/ui/index'
import { USD } from '@constants'

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
            fontSize: config.grid.price.fontsize,
        }
    }

    public get rendererId(): symbol {
        return HorizontalGridRenderer.HORIZONTAL_GRID_ID
    }

    protected update(
        context: RenderingContext,
        container: Container,
    ): Container {
        const { width, height } = context.screen
        const { pricerange } = context.plotdata

        const stepsize = datamath.datastep(pricerange)
        const pricesteps = datamath.steps(pricerange, stepsize, config.grid.price.max)
        const ys = datamath.scaleReverse(pricesteps, pricerange, height)

        const outsideY = -100
        let idx = 0
        // create a set lines and texts and reuse them
        // fix GL_OUT_OF_MEMORY
        while (idx++ < config.grid.price.max*2) {

            let y = ys[idx] || outsideY
            const price = pricesteps[idx] || 0

            // Avoid rendering over time axe text
            // size + anchor=1.1
            const timeHeight = config.grid.time.fontsize + config.grid.time.fontsize * 1.1
            if (y > (height - timeHeight)) y = outsideY

            const [line, lineState] = this.get('y_gridline'+idx, () => GraphicUtils.createLine(
                [0, 0],
                [width, 0],
                this.lineStyle,
            ))
            if (lineState.new) container.addChild(line)
            line.position.set(0, y)
            line.width = width

            const priceValue = ui.currencyScaled(price, USD, stepsize)
            const [text, textState] = this.get('y_gridtext'+idx, () => GraphicUtils.createText(
                priceValue,
                [width, y],
                this.textStyle,
                1.1,
            ))
            if (textState.new) container.addChild(text)
            text.position.set(width, y)
            text.text = priceValue

        }

        return container
    }

}

