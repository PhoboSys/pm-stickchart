import { IGraphicStorage, RenderingContext, GraphicUtils } from '@rendering'
import { LOCK_COUNTDOWN_TEXTURE, RESOLUTION_COUNTDOWN_TEXTURE } from '@rendering/textures'

import datamath from '@lib/datamath'
import { Graphics, Container } from '@lib/pixi'
import { nowUnixTS } from '@lib/utils'
import ui from '@lib/ui'
import { PoolHoverEvent, PoolUnhoverEvent } from '@events'

import { BasePoolsRenderer } from './BasePoolsRenderer'

export class PoolCountdown extends BasePoolsRenderer {

    static readonly POOL_LOCK_COUNTDOWN_ID: symbol = Symbol('POOL_LOCK_COUNTDOWN_ID')

    private readonly gradientStyle: any = {
        alpha: .3,
    }

    private readonly phaseStyle: any = {
        anchor: [0, 1],
        offset: [0, 12],
        textstyle: {
            fill: 0xFFFFFF,
            fontWeight: 400,
            fontFamily: 'Gilroy',
            fontSize: 24,
        }
    }

    private readonly countdownStyle: any = {
        anchor: [0, 1],
        offset: [10, 10],
        textstyle: {
            fill: 0xFFFFFF,
            fontWeight: 400,
            fontFamily: 'Gilroy',
            fontSize: 72,
        }
    }

    private configAnimations: any = {
        positioning: {
            pixi: {
                tint: 0xFFA000,
            },
            duration: 0.5,
            ease: 'power2.out',
            new: 'set',
        },
        resolution: {
            pixi: {
                tint: 0x009797,
            },
            duration: 0.5,
            ease: 'power2.out',
            new: 'set',
        },
        hover_text: {
            pixi: {
                alpha: 1,
            },
            duration: 0.5,
            ease: 'power2.out',
            clear: true,
        },
        unhover_text: {
            pixi: {
                alpha: 0.3,
            },
            duration: 0.5,
            ease: 'power2.out',
            delay: 0.1,
        },
    }

    protected get animations(): any {
        return this.configAnimations
    }

    private _countdownTick: (() => Container) | null

    constructor(renderer: IGraphicStorage) {
        super(renderer)

        this.countdown()
    }

    public get rendererId(): symbol {
        return PoolCountdown.POOL_LOCK_COUNTDOWN_ID
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

        if (!this.isActualPool(pool)) return this.clear()

        this.updateBackground(pool, context, container)
        this.updateText(pool, context, container)

    }

    protected updateBackground(
        pool: any,
        context: RenderingContext,
        container: Container,
    ): void {

        const {
            width,
            height,
        } = context.screen

        const { lockDate, startDate, endDate } = pool
        const { timerange } = context.plotdata

        const [openx, lockx, rx, nowx] = datamath.scale([startDate, lockDate, endDate, nowUnixTS()], timerange, width)
        const tolockx = Math.max(nowx, openx)

        if (lockx >= nowx) {
            const [gradientlock, gradientlockState] = this.get(
                'gradientlock',
                () => new Graphics()
                    .beginTextureFill({
                        texture: context.textures.get(LOCK_COUNTDOWN_TEXTURE),
                    })
                    .drawPolygon([
                        0, 0,
                        lockx - tolockx, 0,
                        lockx - tolockx, height,
                        0, height,
                    ])
                    .closePath()
                    .endFill()
            )
            if (gradientlockState.new) {
                gradientlock.alpha = this.gradientStyle.alpha
                container.addChild(gradientlock)
            }

            gradientlock.position.x = tolockx
            gradientlock.height = height
            gradientlock.width = lockx - tolockx
        } else {
            this.clear('gradientlock')
        }

        if (rx >= nowx) {
            const torx = Math.max(nowx, lockx)
            const [gradientres, gradientresState] = this.get(
                'gradientres',
                () => new Graphics()
                    .beginTextureFill({
                        texture: context.textures.get(RESOLUTION_COUNTDOWN_TEXTURE),
                    })
                    .drawPolygon([
                        0, 0,
                        rx - torx, 0,
                        rx - torx, height,
                        0, height,
                    ])
                    .closePath()
                    .endFill()
            )
            if (gradientresState.new) {
                gradientres.alpha = this.gradientStyle.alpha
                container.addChild(gradientres)
            }

            gradientres.position.x = torx
            gradientres.height = height
            gradientres.width = rx - torx
        } else {
            this.clear('gradientres')
        }
    }

    protected updateText(
        pool: any,
        context: RenderingContext,
        container: Container,
    ): void {

        const {
            height,
            width
        } = context.screen

        const { lockDate, endDate, poolid } = pool

        const {
            latestX,
            latestY,
        } = context.plotdata

        const x = latestX
        const y = latestY

        const now = nowUnixTS()
        const positioning = lockDate >= now
        const countdownValue = positioning
            ? ui.duration24(lockDate - now + 1)
            : ui.duration24(endDate - now + 1)

        const [textgroup, textgroupstate] = this.get('textgroup', () => new Container())
        if (textgroupstate.new) {
            textgroup.alpha = 0
            container.addChild(textgroup)
        }

        const [countdowntext, countdownstate] = this.get(
            'countdowntext',
            () => GraphicUtils.createText(
                countdownValue,
                [0, 0],
                this.countdownStyle.textstyle,
                this.countdownStyle.anchor,
            )
        )
        if (countdownstate.new) textgroup.addChild(countdowntext)

        const [xof, yof] = this.countdownStyle.offset
        countdowntext.text = countdownValue
        countdowntext.position.set(x+xof, y+yof)

        const phaseName = positioning
            ? 'Positioning'
            : 'Resolution'

        const [phasetext, phasetextstate] = this.get(
            'phasetext',
            () => GraphicUtils.createText(
                phaseName,
                [0, 0],
                this.phaseStyle.textstyle,
                this.phaseStyle.anchor,
            )
        )
        if (phasetextstate.new) textgroup.addChild(phasetext)

        const [phxof, phyof] = this.phaseStyle.offset
        phasetext.text = phaseName
        phasetext.position.set(countdowntext.x + phxof, countdowntext.y - countdowntext.height + phyof)

        if (positioning) {
            this.animate('phasetext', 'positioning')
            this.animate('countdowntext', 'positioning')
        } else {
            this.animate('phasetext', 'resolution')
            this.animate('countdowntext', 'resolution')
        }

        if (textgroupstate.animation !== 'hover_text') this.animate('textgroup', 'unhover_text')

        if (!textgroupstate.subscribed) {
            textgroupstate.subscribed = true
            context.eventTarget.addEventListener('poolhover', (e: PoolHoverEvent) => {
                if (e.poolid !== poolid) return

                this.rebind(poolid)
                this.animate('textgroup', 'hover_text')
            })
            context.eventTarget.addEventListener('poolunhover', (e: PoolUnhoverEvent) => {
                if (e.poolid !== poolid) return

                this.rebind(poolid)
                this.animate('textgroup', 'unhover_text')
            })
        }
    }
}
