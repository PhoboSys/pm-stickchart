import { RenderingContext, GraphicUtils } from '@rendering'

import datamath from '@lib/datamath'
import { Graphics, Container } from '@lib/pixi'

import { BasePoolsRenderer } from './BasePoolsRenderer'

export class PoolOpen extends BasePoolsRenderer {

    static readonly POOL_OPEN_ID: symbol = Symbol('POOL_OPEN_ID')

    private openBorder: any = {

        lineStyle: {
            width: 2,
            color: 0xB7BDD7,
            alpha: 1,
        },

        textStyle: {
            fontWeight: 600,
            fontFamily: 'Gilroy',
            fontSize: 12,
            fill: 0x22273F,
        },

        coverStyle: {
            paddingx: 10,
            paddingy: 4,

            paddingTop: 10,
            paddingRight: 10,

            radiuses: [8, 8, 2, 8],
            color: 0xB7BDD7,
        },

    }

    public get rendererId(): symbol {
        return PoolOpen.POOL_OPEN_ID
    }

    protected updatePool(
        pool: any,
        context: RenderingContext,
        container: Container,
    ): void {

        if (this.isHistoricalPool(pool, context)) return this.clear()

        this.updateOpenLine(pool, context, container)

    }

    private updateOpenLine(
        pool: any,
        context: RenderingContext,
        container: Container,
    ): void {
        const { width, height } = context.screen
        const { timerange } = context.plotdata
        const [x] = datamath.scale([pool.openPriceTimestamp], timerange, width)
        const style = this.openBorder

        const [title, titlestate] = this.get('title', () => this.createTitle('Open', style))

        title.position.set(
            x - style.coverStyle.paddingRight,
            style.coverStyle.paddingTop
        )
        if (titlestate.new) container.addChild(title)

        const [line, linestate] = this.get('line',
            () => (new Graphics())
                .lineStyle(style.lineStyle)
                .moveTo(0, 0)
                .lineTo(0, height)
        )

        if (linestate.new) container.addChild(line)

        line.position.x = x
        line.height = height
    }

    private createTitle(title: string, style: { coverStyle: any, textStyle: any }): Container {
        const { paddingx, paddingy } = style.coverStyle

        const text = GraphicUtils.createText(title, [paddingx, paddingy], style.textStyle)

        const width = text.width + paddingx * 2
        const height = text.height + paddingy * 2

        const { radiuses, color } = style.coverStyle
        const cover = GraphicUtils.createRoundedRect(
            [0, 0],
            [width, height],
            radiuses,
            { color }
        )

        text.position.x = -width + paddingx
        cover.position.x = -width

        const group = new Container()
        group.addChild(cover, text)

        return group
    }

}
