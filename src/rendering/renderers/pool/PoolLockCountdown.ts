import config from '../../../config'
import { IGraphicStorage, RenderingContext } from '../..'

import datamath from '../../../lib/datamath'
import { Graphics, Container, Text, Rectangle, Ticker } from '../../../lib/pixi'
import { isEmpty, forEach, nowUnixTS } from '../../../lib/utils'
import ui from '../../../lib/ui'

import { LOCK_COUNTDOWN_TEXTURE } from '../../textures/symbols'

import { BasePoolsRenderer } from './BasePoolsRenderer'

export class PoolLockCountdown extends BasePoolsRenderer {

    static readonly POOL_LOCK_COUNTDOWN_ID: symbol = Symbol('POOL_LOCK_COUNTDOWN_ID')

    private readonly style: any = {
        alpha: .3,
    }

    private readonly postextStyle: any = {
        fill: 0xFFA000,
        fontWeight: 400,
        fontFamily: 'Gilroy',
        fontSize: 16,
        paddingBottom: 5,
    }

    private readonly countdowntextStyle: any = {
        fill: 0xFFA000,
        fontWeight: 400,
        fontFamily: 'Gilroy',
        fontSize: 32,
        paddingBottom: 10,
    }

    private _countdownTick: (() => Container) | null

    constructor(renderer: IGraphicStorage) {
        super(renderer)

        this.countdown()
    }

    public get rendererId(): symbol {
        return PoolLockCountdown.POOL_LOCK_COUNTDOWN_ID
    }

    private countdown(): void {
        if (this._countdownTick) this._countdownTick()

        const period = 1000
        const now = Date.now()
        const firein = Math.floor((now + period) / 1000) * 1000 - now

        setTimeout(() => this.countdown(), firein)
    }

    protected update(
        context: RenderingContext,
        layer: Container
    ): Container {
        this._countdownTick = () => super.update(context, layer)
        return this._countdownTick()
    }

    protected updatePool(
        pool: any,
        context: RenderingContext,
        container: Container,
    ): void {

        this.updateBackground(pool, context, container)
        this.updateText(pool, context, container)

    }

    protected updateBackground(
        pool: any,
        context: RenderingContext,
        container: Container,
    ): void {

        if (pool.lockDate < nowUnixTS()) return this.clear()

        const {
            width,
            height,
        } = context.screen

        const { lockDate, openDate } = pool
        const { timerange } = context.plotdata

        const [openx, rightx, nowx] = datamath.scale([openDate, lockDate, nowUnixTS()], timerange, width)
        const leftx = Math.max(nowx, openx)

        const [gradient, gradientState] = this.get(
            'gradient',
            () => new Graphics()
                .beginTextureFill({
                    texture: context.textures.get(LOCK_COUNTDOWN_TEXTURE),
                })
                .drawPolygon([
                    0, 0,
                    rightx - leftx, 0,
                    rightx - leftx, height,
                    0, height,
                ])
                .closePath()
                .endFill()
        )

        gradient.position.x = leftx

        gradient.width = rightx - leftx
        gradient.height = height
        gradient.alpha = this.style.alpha

        if (gradientState.new) container.addChild(gradient)
    }

    protected updateText(
        pool: any,
        context: RenderingContext,
        container: Container,
    ): void {

        if (pool.lockDate < nowUnixTS()) return this.clear()

        const {
            height,
            width
        } = context.screen

        const { lockDate, openDate } = pool
        const { timerange, paddingY: [top] } = context.plotdata

        const [leftx, rightx] = datamath.scale([openDate, lockDate], timerange, width)
        const x = leftx + (rightx - leftx) / 2
        const y = top

        const countdownValue = ui.duration24(lockDate - nowUnixTS() + 1)
        const [countdowntext, countdownstate] = this.get(
            'countdownText',
            () => new Text(countdownValue, this.countdowntextStyle)
        )
        if (countdownstate.new) container.addChild(countdowntext)

        countdowntext.text = countdownValue
        countdowntext.anchor.set(.5, 1)
        countdowntext.position.set(x, y - this.countdowntextStyle.paddingBottom)

        const [postext, posstate] = this.get(
            'positioningText',
            () => new Text('Positioning', this.postextStyle)
        )
        if (posstate.new) container.addChild(postext)

        postext.anchor.set(.5, 1)
        postext.position.set(x, countdowntext.y - countdowntext.height)

        const [boundary, boundarystate] = this.get('boundary', () => new Graphics())

        boundary
            .clear()
            .beginFill()
            .drawRect(
                leftx, 0,
                rightx - leftx,
                height
            )
            .endFill()

        if (boundarystate.new) {
            postext.mask = boundary
            countdowntext.mask = boundary
        }
    }
}
