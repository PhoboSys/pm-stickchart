import config from '../../../config'
import { IGraphicStorage, RenderingContext } from '../..'
import { BaseRenderer } from '../..'

import datamath from '../../../lib/datamath'
import { Graphics, Container, Text, Rectangle, Ticker } from '../../../lib/pixi'
import { LOCK_COUNTDOWN_TEXTURE } from '../../textures/symbols'
import { DateUtils } from '../../utils/DateUtils'

export class PoolLockCountdownRenderer extends BaseRenderer {

    static readonly POOL_LOCK_COUNTDOWN_ID: symbol = Symbol('POOL_LOCK_COUNTDOWN_ID')

    private readonly style: any

    private readonly postextStyle: any

    private readonly countdowntextStyle: any

    private _countdownTick: (() => void) | null

    constructor(renderer: IGraphicStorage) {
        super(renderer)

        this.style = {
            alpha: .3,
        }

        this.postextStyle = {
            fill: 0xFFA000,
            fontWeight: 400,
            fontFamily: 'Gilroy',
            fontSize: 16,
            paddingBottom: 5,
        }

        this.countdowntextStyle = {
            fill: 0xFFA000,
            fontWeight: 400,
            fontFamily: 'Gilroy',
            fontSize: 32,
            paddingBottom: 10,
        }

        this.countdown()
    }

    public get rendererId(): symbol {
        return PoolLockCountdownRenderer.POOL_LOCK_COUNTDOWN_ID
    }

    private countdown(): void {
        if (this._countdownTick) this._countdownTick()

        const period = 1000
        const now = Date.now()
        const firein = Math.floor((now + period) / 1000) * 1000 - now

        setTimeout(() => this.countdown(), firein)
    }

    private hideContainerAndDestroyVisitor(container: Container): Container {
        container.alpha = 0

        this._countdownTick = null

        return container
    }

    protected update(
        context: RenderingContext,
        container: Container
    ): Container {
        const hasExpired = context.pool?.lockDate < DateUtils.nowUnixTS()
        if (!context.pool || hasExpired) return this.hideContainerAndDestroyVisitor(container)

        this.updateBackground(context, container)
        this.updateText(context, container)

        this._countdownTick = () => this.updateText(context, container)

        container.alpha = 1

        return container
    }

    protected updateBackground(
        context: RenderingContext,
        container: Container,
    ): Container {
        const {
            width,
            height,
        } = context.screen

        const { lockDate, openDate } = context.pool
        const { timerange, xs } = context.plotdata

        const [ox, rightx] = datamath.scale([openDate, lockDate], timerange, width)
        const leftx = Math.max(Number(xs.at(-1)), ox)

        const shape = [
            0, 0,
            rightx - leftx, 0,
            rightx - leftx, height,
            0, height,
        ]

        const [gradient, gradientState] = this.get(
            'gradient',
            () => new Graphics()
                .beginTextureFill({
                    texture: context.textures.get(LOCK_COUNTDOWN_TEXTURE),
                })
                .drawPolygon(shape)
                .closePath()
                .endFill()
        )

        gradient.position.x = leftx

        gradient.width = rightx - leftx
        gradient.height = height
        gradient.alpha = this.style.alpha

        if (gradientState.new) container.addChild(gradient)

        return container
    }

    protected updateText(
        context: RenderingContext,
        container: Container,
    ): Container {
        const hasExpired = context.pool?.lockDate < DateUtils.nowUnixTS()
        if (hasExpired) return this.hideContainerAndDestroyVisitor(container)

        const {
            height,
            width
        } = context.screen

        const { lockDate, openDate } = context.pool
        const { timerange } = context.plotdata

        const [leftx, rightx] = datamath.scale([openDate, lockDate], timerange, width)
        const x = leftx + (rightx - leftx) / 2

        const { top, bottom } = config.padding
        const y = height / (1 + top + bottom) * top

        const countdownValue = DateUtils.formatSecondsToMMSS(lockDate - DateUtils.nowUnixTS())
        const [countdowntext, countdownstate] = this.get(
            'countdownText',
            () => new Text(countdownValue, this.countdowntextStyle)
        )

        if (countdownstate.new) countdownstate.height = countdowntext.height

        countdowntext.text = countdownValue
        countdowntext.anchor.set(.5, 1)
        countdowntext.position.set(x, y - this.countdowntextStyle.paddingBottom)

        const [postext, posstate] = this.get(
            'positioningText',
            () => new Text('Positioning', this.postextStyle)
        )

        postext.anchor.set(.5, 1)
        postext.position.set(x, countdowntext.y - countdownstate.height)

        const [boundary, boundarystate] = this.get(
            'boundary',
            () => new Graphics()
        )

        boundary
            .clear()
            .drawRect(leftx, 0, rightx - leftx, height)

        if (posstate.new) container.addChild(postext)
        if (countdownstate.new) container.addChild(countdowntext)

        if (boundarystate.new) {
            postext.mask = boundary
            countdowntext.mask = boundary
        }

        return container
    }
}
