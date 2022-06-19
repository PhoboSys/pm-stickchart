import { IGraphicStorage, RenderingContext } from '@rendering'
import { BaseRenderer, GraphicUtils } from '@rendering'

import datamath from '@lib/datamath'
import { Graphics, Container, Text } from '@lib/pixi'
export class PoolOpenRenderer extends BaseRenderer {

    static readonly POOL_OPEN_ID: symbol = Symbol('POOL_OPEN_ID')

    private lineStyle: any

    private textStyle: any

    private coverStyle: any

    constructor(renderer: IGraphicStorage) {
        super(renderer)

        this.coverStyle = {
            paddingx: 10,
            paddingy: 4,

            paddingTop: 30,
            paddingRight: 10,

            radiuses: [8, 8, 2, 8],
            color: 0xB7BDD7,
        }

        this.textStyle = {
            fontWeight: 600,
            fontFamily: 'Gilroy',
            fontSize: 12,
            fill: 0x22273F,
        }

        this.lineStyle = {
            width: 2,
            join: 'round',
            cap: 'round',
            gap: 10,
            dash: 10,
            color: 0xB7BDD7,
        }
    }

    public get rendererId(): symbol {
        return PoolOpenRenderer.POOL_OPEN_ID
    }

    protected update(
        context: RenderingContext,
        container: Container,
    ): Container {
        if (!context.pool) {
            container.alpha = 0

            return container
        }

        container.alpha = 1

        this.updatePoolBorder(context, container)

        return container
    }

    private updatePoolBorder(context: RenderingContext, container: Container): Container {
        const {
            width,
            height
        } = context.screen

        const { timerange } = context.plotdata
        const [x] = datamath.scale([context.pool.openDate], timerange, width)

        const [cover, coverstate] = this.get('cover', () => this.createPoolName())

        cover.position.set(
            x - this.coverStyle.paddingRight,
            this.coverStyle.paddingTop
        )

        const [line, linestate] = this.get('dash', () => this.createDash(context))

        line.position.x = x
        line.height = height

        if (coverstate.new) container.addChild(cover)
        if (linestate.new) container.addChild(line)

        return container
    }

    private createPoolName(): Container {
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

        const poolname = new Container()
        poolname.addChild(cover, text)

        return poolname
    }

    private createDash(context: RenderingContext): Graphics {
        const { height } = context.screen

        const dash = GraphicUtils.createVerticalDashLine(
            0,
            [0, height],
            this.lineStyle
        )

        return dash
    }

}
