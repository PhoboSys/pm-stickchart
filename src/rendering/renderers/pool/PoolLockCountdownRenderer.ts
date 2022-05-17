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

    private _context: RenderingContext

    private _countdownTimerID

    constructor(renderer: IGraphicStorage) {
        super(renderer)

        this.style = {
            alpha: .2,
        }

        this.postextStyle = {
            fill: 0xFFA000,
            fontWeight: 400,
            fontFamily: 'Gilroy',
            fontSize: 15,
            paddingBottom: 5,
        }

        this.countdowntextStyle = {
            fill: 0xFFA000,
            fontWeight: 400,
            fontFamily: 'Gilroy',
            fontSize: 20,
            paddingBottom: 10,
        }
    }

    public get rendererId(): symbol {
        return PoolLockCountdownRenderer.POOL_LOCK_COUNTDOWN_ID
    }

    private startCountdownTimer(): void {
        if (this._countdownTimerID) return

        const timer = (): void => {
            const { lockDate } = this._context.pool
            if (DateUtils.nowUnixTS() > lockDate) {

                clearTimeout(this._countdownTimerID)
                this._countdownTimerID = null

                return
            }

            this.updateCountdown()

            clearTimeout(this._countdownTimerID)
            const firein =
                DateUtils.toUnixTS(Date.now() + config.countdownPeriod) * 1000 - Date.now()
            this._countdownTimerID = setTimeout(timer, firein)
        }
        timer()
    }

    private hideContainer(container: Container): Container {
        container.alpha = 0

        return container
    }

    protected update(
        context: RenderingContext,
        container: Container
    ): Container {
        if (!context.pool) return this.hideContainer(container)

        const { lockDate } = context.pool
        if (DateUtils.nowUnixTS() > lockDate) return this.hideContainer(container)

        this.updateBackground(context, container)
        this.updateText(context, container)

        this._context = context
        this.startCountdownTimer()

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
        if (leftx > rightx) return this.hideContainer(container)

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

    protected updateCountdown(): void {
        const [countdowntext] = this.get(
            'countdownText',
            () => new Text('')
        )

        const { lockDate } = this._context.pool
        const countdownSeconds = lockDate - DateUtils.nowUnixTS()

        countdowntext.text = DateUtils.formatSecondsToMMSS(countdownSeconds)
    }

}
