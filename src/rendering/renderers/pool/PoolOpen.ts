import config from '../../../config'
import { RenderingContext } from '../..'
import { GraphicUtils } from '../..'

import datamath from '../../../lib/datamath'
import { nowUnixTS } from '../../../lib/utils'
import { Graphics, Container, Text } from '../../../lib/pixi'

import { BasePoolsRenderer } from './BasePoolsRenderer'

export class PoolOpen extends BasePoolsRenderer {

    static readonly POOL_OPEN_ID: symbol = Symbol('POOL_OPEN_ID')

    private historicalLineStyle: any = {
        color: 0xFFFFFF,
        width: 2,
        alpha: 0,
    }

    private lineStyle: any  = {
        width: 2,
        join: 'round',
        cap: 'round',
        gap: 10,
        dash: 10,
        color: 0xB7BDD7,
    }

    private textStyle: any  = {
        fontWeight: 600,
        fontFamily: 'Gilroy',
        fontSize: 12,
        fill: 0x22273F,
    }

    private coverStyle: any = {
        paddingx: 10,
        paddingy: 4,

        paddingTop: 30,
        paddingRight: 10,

        radiuses: [8, 8, 2, 8],
        color: 0xB7BDD7,
    }

    public get rendererId(): symbol {
        return PoolOpen.POOL_OPEN_ID
    }

    protected updatePool(
        pool: any,
        context: RenderingContext,
        container: Container,
    ): void {

        if (this.isActualPool(pool)) {

            this.clearHistoricalPool()
            this.updateActualPool(pool, context, container)

        } else {

            this.clearActualPool()
            this.updateHistoricalPool(pool, context, container)

        }

    }

    private clearActualPool() {
        this.clear('actualtitle')
        this.clear('actualline')
    }

    private clearHistoricalPool() {
        this.clear('historicalline')
    }

    private updateActualPool(
        pool: any,
        context: RenderingContext,
        container: Container
    ): void {

        const {
            width,
            height
        } = context.screen

        const { timerange } = context.plotdata
        const [x] = datamath.scale([pool.openDate], timerange, width)

        const [title, titlestate] = this.get('actualtitle', () => this.createTitle())

        title.position.set(
            x - this.coverStyle.paddingRight,
            this.coverStyle.paddingTop
        )
        if (titlestate.new) container.addChild(title)

        const [line, linestate] = this.get('actualline', () => this.createLine(context))

        line.position.x = x
        line.height = height

        if (linestate.new) container.addChild(line)
    }

    private createTitle(): Container {
        const { paddingx, paddingy } = this.coverStyle

        const text = new Text('Open', this.textStyle)
        text.position.set(paddingx, paddingy)

        const width = text.width + paddingx * 2
        const height = text.height + paddingy * 2

        const { radiuses, color } = this.coverStyle
        const cover = GraphicUtils.createRoundedRect(
            [0, 0],
            [width, height],
            radiuses,
            { color }
        )

        text.position.x = -width + paddingx
        cover.position.x = -width

        const title = new Container()
        title.addChild(cover, text)

        return title
    }

    private createLine(context: RenderingContext): Graphics {
        const { height } = context.screen

        const dash = GraphicUtils.createVerticalDashLine(
            0,
            [0, height],
            this.lineStyle
        )

        return dash
    }

    private updateHistoricalPool(
        pool: any,
        context: RenderingContext,
        container: Container,
    ): void {

        const {
            width,
            height
        } = context.screen

        const { timerange } = context.plotdata
        const [x] = datamath.scale([pool.openDate], timerange, width)

        const [line, linestate] = this.get('historicalline', () => this.createHistoricalPoolLine(context))
        if (linestate.new) container.addChild(line)

        line.position.x = x + this.historicalLineStyle.width
        line.height = height
    }

    private createHistoricalPoolLine(context: RenderingContext): Graphics {
        const { height } = context.screen

        const line = GraphicUtils.createLine(
            [0, 0],
            [0, height],
            this.historicalLineStyle,
        )

        return line
    }

}
