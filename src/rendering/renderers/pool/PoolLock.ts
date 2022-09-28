import config from '../../../config'
import { RenderingContext } from '../..'
import { GraphicUtils } from '../..'

import datamath from '../../../lib/datamath'
import { Graphics, Container, Text, Sprite } from '../../../lib/pixi'
import { nowUnixTS } from '../../../lib/utils'

import { LOCK_ICON_TEXTURE } from '../../textures/symbols'

import { BasePoolsRenderer } from './BasePoolsRenderer'

export class PoolLock extends BasePoolsRenderer {

    static readonly POOL_LOCK_ID: symbol = Symbol('POOL_LOCK_ID')

    private actualLineStyle: any = {
        width: 2,
        alpha: .8,
        join: 'round',
        cap: 'round',
        color: 0xFFA000,

        gap: 10,
        dash: 10,
    }

    private actualIconStyle: any = {
        size: 13,
    }

    private actualCoverStyle: any = {
        paddingx: 7,
        paddingy: 5,

        paddingTop: 30,
        paddingLeft: 10,

        radiuses: [8, 8, 8, 2],
        color: 0xFFA000,
    }

    public get rendererId(): symbol {
        return PoolLock.POOL_LOCK_ID
    }

    protected updatePool(
        pool: any,
        context: RenderingContext,
        container: Container,
    ): void {

        if (!this.isActualPool(pool)) return this.clear()

        this.updateActualPool(pool, context, container)
    }

    private updateActualPool(
        pool: any,
        context: RenderingContext,
        container: Container,
    ): void {

        const {
            width,
            height
        } = context.screen

        const { timerange } = context.plotdata
        const [x] = datamath.scale([pool.lockDate], timerange, width)

        const [title, titlestate] = this.get('title', () => this.createActualPoolTitle(context))

        title.position.set(
            x + this.actualCoverStyle.paddingLeft,
            this.actualCoverStyle.paddingTop
        )
        if (titlestate.new) container.addChild(title)

        const [line, linestate] = this.get('line', () => this.createActualPoolLine(context))

        line.position.x = x
        line.height = height

        if (linestate.new) container.addChild(line)
    }

    private createActualPoolTitle(context: RenderingContext): Container {
        const { paddingx, paddingy } = this.actualCoverStyle

        const lockIcon = new Sprite(context.textures.get(LOCK_ICON_TEXTURE))
        lockIcon.scale.set(this.actualIconStyle.size / lockIcon.height)
        lockIcon.position.set(paddingx, paddingy)

        const width = lockIcon.width + paddingx * 2
        const height = lockIcon.height + paddingy * 2

        const { radiuses, color } = this.actualCoverStyle
        const cover = GraphicUtils.createRoundedRect(
            [0, 0],
            [width, height],
            radiuses,
            { color }
        )

        const lockPool = new Container()
        lockPool.addChild(cover, lockIcon)

        return lockPool
    }

    private createActualPoolLine(context: RenderingContext): Graphics {
        const { height } = context.screen

        const dash = GraphicUtils.createVerticalDashLine(
            0,
            [0, height],
            this.actualLineStyle
        )

        return dash
    }

}
