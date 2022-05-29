import config from '../../../config'
import { IGraphicStorage, RenderingContext } from '../..'
import { BaseRenderer, GraphicUtils } from '../..'

import datamath from '../../../lib/datamath'
import { Graphics, Container, Text } from '../../../lib/pixi'
import { DisplayQuery } from '../../../lib/dispayquery/index'
export class PoolOpenRenderer extends BaseRenderer {

    static readonly POOL_OPEN_ID: symbol = Symbol('POOL_OPEN_ID')

    private poolnameStyle: any

    private lineStyle: any

    constructor(renderer: IGraphicStorage) {
        super(renderer)

        this.poolnameStyle = {
            default: {
                cover: {
                    paddingx: 10,
                    paddingy: 4,

                    paddingTop: 30,
                    paddingRight: 10,

                    radiuses: [8, 8, 2, 8],
                    color: 0xB7BDD7,
                },
                text: {
                    fontWeight: 600,
                    fontFamily: 'Gilroy',
                    fontSize: 12,
                    fill: 0x22273F,
                }
            },

            'width < 600': { display: false },
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

        this.updatePoolName(context, container)
        this.updateDashLine(context, container)

        return container
    }

    private updatePoolName(context: RenderingContext, container: Container): void {
        const { width } = context.screen

        const { timerange } = context.plotdata
        const [x] = datamath.scale([context.pool.openDate], timerange, width)

        const style = DisplayQuery.apply(this.poolnameStyle, context.displayQuery)
        const [poolname, poolstate] = this.get(
            'poolname',
            () => this.createPoolName(style),
            Object.values(style)
        )

        const { paddingRight, paddingTop } = style.cover
        poolname.position.set(
            x - paddingRight,
            paddingTop
        )

        if (poolstate.new) container.addChild(poolname)
    }

    private updateDashLine(context: RenderingContext, container: Container): void {
        const {
            width,
            height
        } = context.screen

        const { timerange } = context.plotdata
        const [x] = datamath.scale([context.pool.openDate], timerange, width)

        const [line, linestate] = this.get('dash', () => this.createDash(context))

        line.position.x = x
        line.height = height

        if (linestate.new) container.addChild(line)
    }

    private createPoolName(style): Container {
        if (!style.display) return new Container

        const { paddingx, paddingy } = style.cover

        const text = new Text('Open', style.text)
        text.position.set(paddingx, paddingy)

        const width = text.width + paddingx * 2
        const height = text.height + paddingy * 2

        const { radiuses, color } = style.cover
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
