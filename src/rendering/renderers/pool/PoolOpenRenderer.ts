import config from '../../../config'
import { IGraphicStorage, RenderingContext } from '../..'
import { BaseRenderer, GraphicUtils } from '../..'

import datamath from '../../../lib/datamath'
import { Graphics, Container, Text } from '../../../lib/pixi'
export class PoolOpenRenderer extends BaseRenderer {

    static readonly POOL_OPEN_ID: symbol = Symbol('POOL_OPEN_ID')

    private lineStyle: any

    private torusStyle: any

    private textStyle: any

    private coverStyle: any

    constructor(renderer: IGraphicStorage) {
        super(renderer)

        this.coverStyle = {
            paddingx: 10,
            paddingy: 4,

            paddingTop: 30,
            paddingRight: 10,

            radius: 8,
            color: 0x22273F,

            lineStyle: {
                color: 0xB7BDD7,
                width: 2,
            }
        }

        this.textStyle = {
            fontWeight: 600,
            fontFamily: 'Gilroy',
            fontSize: 12,
            fill: 0xB7BDD7,
        }

        this.torusStyle = {
            innerr: 2.5,
            outerr: 5,
            paddingTop: 10,
            color: 0xB7BDD7,
        }

        this.lineStyle = {
            width: 2,
            join: 'round',
            cap: 'round',
            gap: 10,
            dash: 10,
            paddingTop: 5,
            paddingBottom: 30,
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

        const [torus, torusstate] = this.get('torus', () => this.createTorus())

        torus.position.set(
            x,
            cover.position.y + cover.height
        )

        const [line, linestate] = this.get('dash', () => this.createDash(context))

        line.position.set(
            x,
            torus.position.y + this.torusStyle.outerr
        )
        line.height = height - line.position.y - this.lineStyle.paddingBottom

        if (coverstate.new) container.addChild(cover)
        if (torusstate.new) container.addChild(torus)
        if (linestate.new) container.addChild(line)

        return container
    }

    private createPoolName(): Container {
        const { paddingx, paddingy } = this.coverStyle

        const text = new Text('Open', this.textStyle)
        text.position.set(paddingx, paddingy)

        const width = text.width + paddingx * 2
        const height = text.height + paddingy * 2

        const { radius, color } = this.coverStyle
        const cover = new Graphics()
            .beginFill(color)
            .lineStyle(this.coverStyle.lineStyle)
            .drawRoundedRect(0, 0, width, height, radius)
            .endFill()

        text.position.x = -width + paddingx
        cover.position.x = -width

        const poolname = new Container()
        poolname.addChild(cover, text)

        return poolname
    }

    private createTorus(): Graphics {
        const { innerr, outerr, color } = this.torusStyle

        const torus = new Graphics()
            .beginFill(color)
            .drawTorus!(0, 0, innerr, outerr)
            .endFill()

        return torus
    }

    private createDash(context: RenderingContext): Graphics {
        const { height } = context.screen

        const { paddingBottom, paddingTop } = this.lineStyle

        const dash = GraphicUtils.createVerticalDashLine(
            0,
            [0, height - paddingBottom],
            this.lineStyle
        )

        dash.position.y = paddingTop

        return dash
    }

}
