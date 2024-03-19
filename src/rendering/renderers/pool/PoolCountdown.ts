import { IGraphicStorage, RenderingContext, GraphicUtils } from '@rendering'
import { LOCK_COUNTDOWN_TEXTURE, RESOLUTION_COUNTDOWN_TEXTURE } from '@rendering/textures'
import { WINNING_COUNTDOWN_TEXTURE } from '@rendering/textures'

import config from '@config'
import datamath from '@lib/datamath'
import { Container, Graphics, gsap } from '@lib/pixi'
import { nowUnixTS } from '@lib/utils'
import ui from '@lib/ui'
import { PoolHoverEvent, PoolUnhoverEvent } from '@events'
import { EPosition } from '@enums'

import { BasePoolsRenderer } from './BasePoolsRenderer'

export class PoolCountdown extends BasePoolsRenderer {

    static readonly POOL_LOCK_COUNTDOWN_ID: symbol = Symbol('POOL_LOCK_COUNTDOWN_ID')

    private readonly lockGradientStyle: any = {
        alpha: 0.33,
        offset: [0, config.style.lockCountdown.padding],
        radiuses: [24, 0, 0, 24]
    }

    private readonly resolutionGradientStyle: any = {
        alpha: 1,
        offset: [0, config.style.resolutionCountdown.padding],
        radiuses: [24, 0, 0, 24]
    }

    private readonly winningGradientContainerStyle: any = {
        alpha: 0,
        offset: [0, config.style.winningCountdown.padding],
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
                tint: 0xA7E0FF,
            },
            duration: 0.5,
            ease: 'power2.out',
            new: 'set',
        },
        locked: {
            pixi: {
                tint: 0xA7E0FF,
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
        winning_gradient_show: {
            pixi: {
                alpha: 1,
            },
            duration: 0.5,
            ease: 'power2.out',
            new: 'set',
            clear: true,
        },
        winning_gradient_hide: {
            pixi: {
                alpha: 0,
            },
            duration: 0.5,
            ease: 'power2.out',
        }
    }

    protected get animations(): any {
        return this.configAnimations
    }

    private validPariPositions = {
        [EPosition.Up]: EPosition.Up,
        [EPosition.Down]: EPosition.Down,
        [EPosition.Zero]: EPosition.Zero,
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
        this._countdownTick = (): Container => super.update(context, layer)

        return this._countdownTick()
    }

    protected updatePool(
        pool: any,
        context: RenderingContext,
        container: Container,
    ): void {

        if (!this.isActualPool(pool, context)) return this.clear()

        container.sortableChildren = true

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
        const { timerange, latestX } = context.plotdata

        const [openx, lockx, rx, nowx] = datamath.scale([startDate, lockDate, endDate, nowUnixTS()], timerange, width)
        const tolockx = Math.max(nowx, openx)

        if (lockx >= nowx) {
            const lockheight = height - 2 * this.lockGradientStyle.offset[1]
            const lockwidth = lockx - tolockx

            const [gradientlock, gradientlockState] = this.get(
                'gradientlock',
                () => this.createGradient(
                    this.lockGradientStyle,
                    [width, lockheight],
                    context.textures.get(LOCK_COUNTDOWN_TEXTURE, { width })
                ),
                [lockheight, width]
            )

            if (gradientlockState.new) container.addChild(gradientlock)

            gradientlock.position.x = lockx
            gradientlock.mask.pivot.x = lockwidth
        } else {
            this.clear('gradientlock')
        }

        if (rx >= latestX) {
            const rheight = height - 2 * this.resolutionGradientStyle.offset[1]
            const torx = Math.max(latestX, lockx)
            const rwidth = rx - torx

            const [gradientres, gradientresState] = this.get(
                'gradientres',
                () => this.createGradient(
                    this.resolutionGradientStyle,
                    [width, rheight],
                    context.textures.get(RESOLUTION_COUNTDOWN_TEXTURE, { width })
                ),
                [rheight, width]
            )
            if (gradientresState.new) container.addChild(gradientres)

            const resolution = this.getPoolResolution(pool, context)
            if (pool.openPriceValue && pool.openPriceTimestamp && (resolution in this.validPariPositions)) {

                const [winningcontainer, winningcontainerState] = this.get('winningcontainer', () => this.createWinningContainer())
                if (winningcontainerState.new || gradientresState.new) gradientres.addChild(winningcontainer)

                const [winninggradient, winninggradientState] = this.get(
                    'winninggradient',
                    () => this.createWinningGradient(context, [gradientres.width, 2*rheight]),
                    [rheight, gradientres.width]
                )
                if (winninggradientState.new) {
                    winningcontainer.addChild(winninggradient)
                    winninggradientState.timeline = this.createWinningGradientTimeline(winninggradient, rheight)
                }

                const paris = context.paris?.[pool.poolid]
                const hasWinPari = paris && paris.some(pari => pari.position === resolution)
                const ofy = this.winningGradientContainerStyle.offset[1]

                if (hasWinPari) {
                    if (resolution === EPosition.Up) winningcontainer.position.y = ofy-rheight
                    if (resolution === EPosition.Zero) winningcontainer.position.y = ofy-rheight/2
                    if (resolution === EPosition.Down) winningcontainer.position.y = ofy
                    this.animate('winningcontainer', 'winning_gradient_show')
                } else {
                    this.animate('winningcontainer', 'winning_gradient_hide')
                }
            } else {
                this.clear('winningcontainer')
                this.clear('winninggradient')
            }

            gradientres.position.x = rx
            gradientres.mask.pivot.x = rwidth
        } else {
            this.clear('winningcontainer')
            this.clear('winninggradient')
            this.clear('gradientres')
        }
    }

    protected createWinningContainer(): Container {
        const { alpha, offset } = this.winningGradientContainerStyle

        const container = new Container()
        container.alpha = alpha
        container.position.set(...offset)

        return container
    }

    protected createWinningGradient(context, [width, height]): Container {
        const gradient = new Graphics()

        gradient
            .beginTextureFill({ texture: context.textures.get(WINNING_COUNTDOWN_TEXTURE, { width, height }) })
            .drawRect(0, 0, width, height)
            .endFill()

        return gradient
    }

    protected createWinningGradientTimeline(gradient, height): gsap.core.Timeline {
        return gsap.timeline({ repeat: -1, yoyo: true, yoyoEase: 'power1.inOut' })
            .to(gradient, {
                pixi: { y: -height*0.1 },
                duration: 2,
                ease: 'power1.inOut',
            })
            .to(gradient, {
                pixi: { y: height*0.1 },
                duration: 2,
                ease: 'power1.inOut',
            })
    }

    protected createGradient(style, [width, height], texture): { mask: Graphics } & Container {
        const group = new Container()

        const gradient = GraphicUtils.createRoundedRect(
            style.offset,
            [width, height],
            style.radiuses,
            { texture }
        )
        group.addChild(gradient)

        const mask = gradient.clone()
        group.addChild(mask)

        group.pivot.x = width
        mask.position.x = width
        gradient.alpha = style.alpha
        group.mask = mask

        return <{ mask: Graphics } & Container>group
    }

    protected updateText(
        pool: any,
        context: RenderingContext,
        container: Container,
    ): void {

        const { lockDate, endDate, poolid } = pool

        const {
            latestX,
            latestY,
        } = context.plotdata

        const x = latestX
        const y = latestY

        const now = nowUnixTS()
        const locked = now >= lockDate
        const countdownValue = locked
            ? ui.duration24(endDate - now)
            : ui.duration24(lockDate - now)

        if (now >= endDate) {
            this.clear('textgroup')
            this.clear('countdowntext')
            this.clear('phasetext')

            return
        }

        const [textgroup, textgroupstate] = this.get('textgroup', () => new Container())
        if (textgroupstate.new) {
            textgroup.alpha = 0
            textgroup.zIndex = 3
            container.addChild(textgroup)
        }

        const [countdowntext, countdownstate] = this.get('countdowntext',
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

        const phaseName = locked
            ? 'Round'
            : 'Entry'

        const [phasetext, phasetextstate] = this.get('phasetext',
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

        if (locked) {
            this.animate('phasetext', 'locked')
            this.animate('countdowntext', 'locked')
        } else {
            this.animate('phasetext', 'positioning')
            this.animate('countdowntext', 'positioning')
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
