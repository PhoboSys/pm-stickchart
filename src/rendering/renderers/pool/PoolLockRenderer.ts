import config from '../../../config'
import { IGraphicStorage, RenderingContext } from '../..'
import { BaseRenderer, GraphicUtils } from '../..'

import datamath from '../../../lib/datamath'
import { Graphics, Container, Text, Sprite } from '../../../lib/pixi'
import { LOCK_ICON_TEXTURE } from '../../textures/symbols'
export class PoolLockRenderer extends BaseRenderer {

    static readonly POOL_LOCK_ID: symbol = Symbol('POOL_LOCK_ID')

    private lineStyle: any

    private torusStyle: any

    private iconStyle: any

    private coverStyle: any

    constructor(renderer: IGraphicStorage) {
        super(renderer)

        this.coverStyle = {
            paddingx: 7,
            paddingy: 5,

            paddingTop: 30,
            paddingLeft: 10,

            radius: 8,
            color: 0xFFA000,
        }

        this.iconStyle = {
            size: 13,
        }

        this.torusStyle = {
            innerr: 2.5,
            outerr: 5,
            paddingTop: 10,
            color: 0xFFA000,
        }

        this.lineStyle = {
            width: 2,
            join: 'round',
            cap: 'round',
            gap: 10,
            dash: 10,
            paddingTop: 5,
            paddingBottom: 20,
            color: 0xFFA000,
        }
    }

    public get rendererId(): symbol {
        return PoolLockRenderer.POOL_LOCK_ID
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
        const [x] = datamath.scale([context.pool.lockDate], timerange, width)

        const [cover, coverstate] = this.get('icon', () => this.createPoolIcon(context))

        cover.position.set(
            x + this.coverStyle.paddingLeft,
            this.coverStyle.paddingTop
        )

        const [torus, torusstate] = this.get('torus', () => this.createTorus())

        torus.position.set(
            x,
            cover.position.y + cover.height
        )

        const [line, linestate] = this.get('dash', () => this.createDash(context))

        line.height = height - line.position.y - this.lineStyle.paddingBottom
        line.position.set(
            x,
            torus.position.y + this.torusStyle.outerr
        )

        if (coverstate.new) container.addChild(cover)
        if (torusstate.new) container.addChild(torus)
        if (linestate.new) container.addChild(line)

        return container
    }

    private createPoolIcon(context: RenderingContext): Container {
        const { paddingx, paddingy } = this.coverStyle

        const lockIcon = new Sprite(context.textures.get(LOCK_ICON_TEXTURE))
        lockIcon.scale.set(this.iconStyle.size / lockIcon.height)
        lockIcon.position.set(paddingx, paddingy)

        const width = lockIcon.width + paddingx * 2
        const height = lockIcon.height + paddingy * 2

        const { radius, color } = this.coverStyle
        const cover = new Graphics()
            .beginFill(color)
            .lineStyle(this.coverStyle.lineStyle)
            .drawRoundedRect(0, 0, width, height, radius)
            .endFill()

        const lockPool = new Container()
        lockPool.addChild(cover, lockIcon)

        return lockPool
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
